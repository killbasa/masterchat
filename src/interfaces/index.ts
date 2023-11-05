import type { TimedContinuation } from './misc';
import type { Action } from './actions';

export * from './actions';
export * from './misc';
export * from './yt';

export type ChatResponse = {
	actions: Action[];
	continuation: TimedContinuation | undefined;
	error: null;
};

export type Credentials = {
	SAPISID: string;
	APISID: string;
	HSID: string;
	SID: string;
	SSID: string;

	/**
	 * @deprecated Use DELEGATED_SESSION_ID
	 */
	SESSION_ID?: string;

	/**
	 * Delegated session id for brand account
	 */
	DELEGATED_SESSION_ID?: string;
};
