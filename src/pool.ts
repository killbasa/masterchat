import { MasterchatError } from './errors';
import { Masterchat } from './masterchat';
import { EventEmitter } from 'events';
import type { IterateChatOptions, MasterchatOptions } from './masterchat';
import type { EndReason } from './errors';
import type { ChatResponse, Credentials } from './interfaces';
import type { Action, AddChatItemAction } from './interfaces/actions';

export class StreamPool extends EventEmitter {
	private readonly pool: Map<string, Masterchat> = new Map();
	private readonly options?: MasterchatOptions;
	private started = false;

	public constructor(options?: MasterchatOptions) {
		super();
		this.options = options;
	}

	public get entries() {
		return Array.from(this.pool.entries());
	}

	public async forEach(fn: (agent: Masterchat, videoId: string, index: number) => void) {
		return Promise.allSettled(
			this.entries.map(
				async (
					// @ts-expect-error ignore
					[videoId, instance],
					i
				) => {
					return Promise.resolve(
						// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
						fn(instance, videoId, i)
					);
				}
			)
		);
	}

	public async setCredentials(credentials?: Credentials | string) {
		await this.forEach((instance) => {
			instance.setCredentials(credentials);
		});
	}

	public get(videoId: string) {
		return this.pool.get(videoId);
	}

	/**
	 * resolves after every stream closed
	 */
	public async ensure() {
		return new Promise<void>((resolve) => {
			const timer = setInterval(() => {
				if (this.streamCount() === 0) {
					clearInterval(timer);
					resolve();
				}
			}, 1000);
		});
	}

	/**
	 * number of active streams
	 */
	public streamCount() {
		return this.pool.size;
	}

	/**
	 * check if the given stream is already subscribed
	 */
	public has(videoId: string) {
		return this.pool.has(videoId);
	}

	/**
	 * subscribe live chat.
	 * always guarantees single instance for each stream.
	 */
	public async subscribe(videoId: string, channelId: string, iterateOptions?: IterateChatOptions): Promise<Masterchat> {
		if (this.has(videoId)) return this.pool.get(videoId)!;

		const mc = new Masterchat(videoId, channelId, this.options);

		mc.on('end', (reason) => {
			this._handleEnd(mc, reason);
		});
		mc.on('error', (err) => {
			this._handleError(mc, err);
		});
		mc.on('data', (data) => {
			this._handleData(mc, data);
		});
		mc.on('actions', (actions) => {
			this._handleActions(mc, actions);
		});
		mc.on('chats', (chats) => {
			this._handleChats(mc, chats);
		});
		await mc.listen(iterateOptions);

		if (!this.started) {
			this.started = true;
			await this.ensure();
		}

		this.pool.set(videoId, mc);

		return mc;
	}

	/**
	 * stop subscribing live chat
	 */
	public unsubscribe(videoId: string) {
		const mc = this.pool.get(videoId);
		if (!mc) return;
		mc.stop(); // will emit 'end' event
	}

	private _handleData(mc: Masterchat, data: ChatResponse) {
		this.emit('data', data, mc);
	}

	private _handleActions(mc: Masterchat, actions: Action[]) {
		this.emit('actions', actions, mc);
	}

	private _handleChats(mc: Masterchat, chats: AddChatItemAction[]) {
		this.emit('chats', chats, mc);
	}

	private _handleEnd(mc: Masterchat, reason: EndReason) {
		this.pool.delete(mc.videoId);
		this.emit('end', reason, mc);
	}

	private _handleError(mc: Masterchat, err: Error | MasterchatError) {
		this.pool.delete(mc.videoId);
		this.emit('error', err, mc);
	}
}
