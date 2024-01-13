import { buildAuthHeaders } from './auth';
import { parseAction } from './chat';
import {
	AbortError,
	DisabledChatError,
	InvalidArgumentError,
	MasterchatError,
	MembersOnlyError,
	NoPermissionError,
	UnavailableError
} from './errors';
import { YTChatErrorStatus } from './interfaces';
import { b64tou8, liveReloadContinuation, replayTimedContinuation } from './protobuf';
import { debugLog, delay, getTimedContinuation, stringify, unwrapReplayActions, withContext } from './utils';
import * as Constants from './constants';
import { AsyncIterator } from 'iterator-helpers-polyfill';
import axios, { AxiosError } from 'axios';
import EventEmitter from 'events';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { EndReason } from './errors';
import type { Action, AddChatItemAction, ChatResponse, Credentials } from './interfaces';
import type { YTChatResponse } from './interfaces/yt/chat';

export type RetryOptions = {
	retry?: number;
	retryInterval?: number;
};

export type IterateChatOptions = FetchChatOptions & {
	/**
	 * ignore first response fetched by reload token
	 * set it to false which means you might get chats already processed before when recovering MasterchatAgent from error. Make sure you have unique index for chat id to prevent duplication.
	 * @default false
	 * */
	ignoreFirstResponse?: boolean;

	/** pass previously fetched token to resume chat fetching */
	continuation?: string;
};

export type FetchChatOptions = {
	/** fetch top chat instead of all chat */
	topChat?: boolean;
};

export type ChatListener = Promise<void>;

export type Events = {
	data: (data: ChatResponse, mc: Masterchat) => void;
	actions: (actions: Action[], mc: Masterchat) => void;
	chats: (chats: AddChatItemAction[], mc: Masterchat) => void;
	chat: (chat: AddChatItemAction, mc: Masterchat) => void;
	end: (reason: EndReason) => void;
	error: (error: Error | MasterchatError) => void;
};

export type MasterchatOptions = {
	/** you can grab Credentials using `extra/credential-fetcher` */
	credentials?: Credentials | string;

	/** set live chat mode
	 *
	 * ```
	 * if undefined,
	 *   live -> OK
	 *   archive -> OK
	 *
	 * if "live":
	 *   live -> OK
	 *   archive -> throw DisabledChatError
	 *
	 * if "replay":
	 *   live -> throw DisabledChatError
	 *   archive -> OK
	 * ```
	 */
	mode?: 'live' | 'replay';

	axiosInstance?: AxiosInstance;
};

export class Masterchat extends EventEmitter {
	public videoId!: string;
	public channelId!: string;

	public isLive?: boolean;
	public channelName?: string;
	public title?: string;

	private readonly axiosInstance: AxiosInstance;
	private listener: ChatListener | null = null;
	private listenerAbortion: AbortController = new AbortController();

	private credentials?: Credentials;

	/**
	 * Much faster than Masterchat.init
	 */
	public constructor(videoId: string, channelId: string, { mode, credentials, axiosInstance }: MasterchatOptions = {}) {
		super();
		this.videoId = videoId;
		this.channelId = channelId;
		this.isLive = mode === 'live' ? true : mode === 'replay' ? false : undefined;

		this.axiosInstance =
			axiosInstance ??
			axios.create({
				timeout: 4000
			});

		this.setCredentials(credentials);
	}

	/**
	 * Set credentials. This will take effect on the subsequent requests.
	 */
	public setCredentials(credentials?: Credentials | string): void {
		if (typeof credentials === 'string') {
			credentials = JSON.parse(new TextDecoder().decode(b64tou8(credentials))) as Credentials;
		}

		this.credentials = credentials;
	}

	public async listen(iterateOptions?: IterateChatOptions) {
		if (this.listener) {
			await this.listener;
			return;
		}

		this.listenerAbortion = new AbortController();

		let handledFirstResponse = false;

		const makePromise = async ({ iterateOptions }: { iterateOptions?: IterateChatOptions }) => {
			// NOTE: `ignoreFirstResponse=false` means you might get chats already processed before when recovering MasterchatAgent from error. Make sure you have unique index for chat id to prevent duplication.
			for await (const res of this.iterate(iterateOptions)) {
				handledFirstResponse = true;

				this.emit('data', res, this);

				const { actions } = res;
				this.emit('actions', actions, this);

				// only normal chats
				if (this.listenerCount('chats') > 0 || this.listenerCount('chat') > 0) {
					const chats = actions.filter((action): action is AddChatItemAction => action.type === 'addChatItemAction');
					this.emit('chats', chats, this);
					chats.forEach((chat) => this.emit('chat', chat, this));
				}
			}
		};

		this.listener = makePromise({
			iterateOptions
		})
			.then(() => {
				// live chat closed by streamer
				this.emit('end', null);
			})
			.catch((err) => {
				if (err instanceof AbortError) return;

				// special treatment for unrecoverable unavailable/private errors
				// emit 'end' only if ->
				//   (not first response) && unrecoverable (private || unavailable)
				if (
					err instanceof MasterchatError &&
					[
						'private',
						'unavailable',
						'disabled' // disabled ()
					].includes(err.code) &&
					handledFirstResponse
				) {
					const reason = (() => {
						switch (err.code) {
							case 'private':
								return 'privated';
							case 'unavailable':
								return 'deleted';
							case 'disabled':
								return 'disabled';
							default:
								return null;
						}
					})();
					this.emit('end', reason);
					return;
				}

				this.emit('error', err);
			})
			.finally(() => {
				this.listener = null;
			});

		await this.listener;
	}

	/**
	 * (EventEmitter API)
	 * stop listening live stream
	 */
	public stop(): void {
		if (!this.listener) return;
		this.listenerAbortion.abort();
		this.emit('end', 'aborted');
	}

	/**
	 * (EventEmitter API)
	 * returns listener status
	 */
	public get stopped() {
		return this.listener === null;
	}

	/**
	 * AsyncIterator API
	 */
	public iter(options?: IterateChatOptions): AsyncIterator<Action> {
		return AsyncIterator.from<ChatResponse>(this.iterate(options)).flatMap<Action>((action) => action.actions);
	}

	/**
	 * (AsyncGenerator API)
	 * Iterate until live stream ends
	 */
	public async *iterate({ topChat = false, ignoreFirstResponse = false, continuation }: IterateChatOptions = {}): AsyncGenerator<ChatResponse> {
		const { signal } = this.listenerAbortion;

		if (signal.aborted) {
			throw new AbortError();
		}

		let token: any = continuation ? continuation : { top: topChat };

		let treatedFirstResponse = false;

		// continuously fetch chat fragments
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		while (true) {
			const res = await this.fetch(token);
			const startMs = Date.now();

			// handle chats
			if (!(ignoreFirstResponse && !treatedFirstResponse)) {
				yield res;
			}

			treatedFirstResponse = true;

			// refresh continuation token
			const { continuation } = res;

			if (!continuation) {
				// stream ended normally
				break;
			}

			token = continuation.token;

			if (this.isLive ?? true) {
				const driftMs = Date.now() - startMs;
				const timeoutMs = continuation.timeoutMs - driftMs;
				if (timeoutMs > 500) {
					await delay(timeoutMs, signal);
				}
			}
		}
	}

	public async fetch(options?: FetchChatOptions): Promise<ChatResponse>;
	public async fetch(token: string, options?: FetchChatOptions): Promise<ChatResponse>;
	public async fetch(tokenOrOptions?: FetchChatOptions | string, maybeOptions?: FetchChatOptions): Promise<ChatResponse> {
		const options = (typeof tokenOrOptions === 'string' ? maybeOptions : tokenOrOptions) ?? {};
		const topChat = options.topChat ?? false;
		const target = this.cvPair();

		let retryRemaining = 5;
		const retryInterval = 1000;

		let requestUrl = '';
		let requestBody;
		let payload: YTChatResponse;

		function applyNewLiveStatus(isLive: boolean) {
			requestUrl = isLive ? Constants.EP_GLC : Constants.EP_GLCR;

			const continuation =
				typeof tokenOrOptions === 'string'
					? tokenOrOptions
					: isLive
						? liveReloadContinuation(target, { top: topChat })
						: replayTimedContinuation(target, { top: topChat });

			requestBody = withContext({
				continuation
			});
		}

		applyNewLiveStatus(this.isLive ?? true);

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		loop: while (true) {
			try {
				payload = await this.post<YTChatResponse>(requestUrl, requestBody);
			} catch (err) {
				// handle user cancallation
				if ((err as any)?.message === 'canceled') {
					this.log(`fetch`, `Request canceled`);
					throw new AbortError();
				}

				// handle server errors
				if ((err as any)?.isAxiosError) {
					const { code: axiosErrorCode, response } = err as AxiosError<{
						error: {
							code: number;
							status: string;
							message: string;
						};
					}>;

					// handle early timeout
					if (axiosErrorCode === 'ECONNABORTED' || axiosErrorCode === 'ERR_REQUEST_ABORTED') {
						if (retryRemaining > 0) {
							retryRemaining -= 1;
							this.log(`fetch`, `Retrying ${retryRemaining} / ${retryInterval}ms cause=EARLY_TIMEOUT`);
							await delay(retryInterval);
							continue;
						}
					}

					if (!response) {
						this.log('fetch', `Empty error response ${err} (${axiosErrorCode})`);
						throw new Error(`Axios got empty error response: ${err} (${axiosErrorCode})`);
					}

					/** error.code
					 * 400: request contains an invalid argument
					 *   - when attempting to access livechat while it is already in replay mode
					 * 403: no permission
					 *   - video was made private by uploader
					 *   - something went wrong (server-side)
					 * 404: not found
					 *   - removed by uploader
					 * 500: internal error
					 *   - server-side failure
					 * 503: The service is currently unavailable
					 *   - temporary server-side failure
					 */
					const { code, status, message } = response.data.error;
					this.log(`fetch`, `API error: ${code} (${status}): ${message}`);

					switch (status) {
						// stream got privated
						case YTChatErrorStatus.PermissionDenied:
							throw new NoPermissionError(message);

						// stream got deleted
						case YTChatErrorStatus.NotFound:
							throw new UnavailableError(message);

						// stream already turned into archive OR received completely malformed token
						case YTChatErrorStatus.Invalid:
							throw new InvalidArgumentError(message);

						// it might be a temporary issue so you should retry immediately
						case YTChatErrorStatus.Unavailable:
						// @ts-expect-error ignore
						case YTChatErrorStatus.Internal:
							if (retryRemaining > 0) {
								retryRemaining -= 1;
								this.log(`fetch`, `Retrying ${retryRemaining} / ${retryInterval}ms cause=${status}`);
								await delay(retryInterval);
								continue loop;
							}

						default:
							this.log(`fetch`, `[action required] Got unrecognized error from the API:`, status, message, JSON.stringify(response.data));
							throw new Error(message);
					}
				}

				// handle client-side errors
				// ECONNRESET, ETIMEOUT, etc
				this.log(`fetch`, `Unrecoverable error:`, err);
				throw err;
			}

			const { continuationContents } = payload;

			if (!continuationContents) {
				/** there's several possibilities lied here:
				 * 1. live chat is over (primary)
				 * 2. turned into membership-only stream
				 * 3. given video is neither a live stream nor an archived stream
				 * 4. chat got disabled
				 */
				const obj = Object.assign({}, payload) as any;
				delete obj.responseContext;

				if ('contents' in obj) {
					const reason = stringify(obj.contents.messageRenderer.text.runs);
					if (reason.includes('disabled')) {
						// {contents: "Chat is disabled for this live stream."} => pre-chat unavailable
						// or accessing replay chat with live chat token
						// retry with replay endpoint if isLive is unknown
						if (this.isLive === undefined) {
							this.log('fetch', 'Switched to replay endpoint');
							this.isLive = false;
							applyNewLiveStatus(false);
							continue;
						}

						throw new DisabledChatError(reason);
					} else if (reason.includes('currently unavailable')) {
						// {contents: "Sorry, live chat is currently unavailable"} =>
						// - Turned into members-only stream
						// - No stream recordings
						throw new MembersOnlyError(reason);
					}
					this.log(`fetch`, `continuationNotFound(with contents)`, reason);
				} else if ('trackingParams' in obj) {
					// {trackingParams} => ?
				}

				// {} => Live stream ended
				return {
					actions: [],
					continuation: undefined,
					error: null
				};
			}

			const newContinuation = getTimedContinuation(continuationContents);

			let rawActions = continuationContents.liveChatContinuation.actions;

			// this means no chat available between the time window
			if (!rawActions) {
				return {
					actions: [],
					continuation: newContinuation,
					error: null
				};
			}

			// unwrap replay actions
			if (!(this.isLive ?? true)) {
				rawActions = unwrapReplayActions(rawActions);
			}

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			const actions = rawActions.map(parseAction).filter((a): a is Action => a !== undefined);

			const chat: ChatResponse = {
				actions,
				continuation: newContinuation,
				error: null
			};

			return chat;
		}
	}

	private async post<T>(input: string, body: any, config: AxiosRequestConfig = {}): Promise<T> {
		if (!input.startsWith('http')) {
			input = Constants.DO + input;
		}

		const res = await this.axiosInstance.request<T>({
			...config,
			url: input,
			signal: this.listenerAbortion.signal,
			method: 'POST',
			headers: {
				...config.headers,
				'Content-Type': 'application/json',
				...(this.credentials && buildAuthHeaders(this.credentials)),
				...Constants.DH
			},
			data: body
		});

		return res.data;
	}

	private log(label: string, ...obj: any): void {
		debugLog(`${label}(${this.videoId}):`, ...obj);
	}

	private cvPair(): {
		channelId: string;
		videoId: string;
	} {
		return {
			channelId: this.channelId,
			videoId: this.videoId
		};
	}
}
