export type EndReason =
	| 'aborted' // Aborted by user
	| 'deleted' // Deleted by streamer
	| 'disabled' // Chat disabled by streamer
	| 'privated' // Privated by streamer
	| null; // Stream ended normally

export type ErrorCode =
	| 'denied' // Access denied (429)
	| 'disabled' // Live chat is disabled
	| 'invalid' // Invalid request
	| 'membersOnly' // No permission (members-only)
	| 'private' // No permission (private)
	| 'unarchived' // Live stream recording is not available
	| 'unavailable'; // Deleted video OR wrong video id

export class MasterchatError extends Error {
	public code: ErrorCode;

	public constructor(code: ErrorCode, msg: string) {
		super(msg);
		this.code = code;

		Object.setPrototypeOf(this, MasterchatError.prototype);
	}
}

export class UnavailableError extends MasterchatError {
	public constructor(msg: string) {
		super('unavailable', msg);
		Object.setPrototypeOf(this, UnavailableError.prototype);
	}
}

export class DisabledChatError extends MasterchatError {
	public constructor(msg: string) {
		super('disabled', msg);
		Object.setPrototypeOf(this, DisabledChatError.prototype);
	}
}

export class NoPermissionError extends MasterchatError {
	public constructor(msg: string) {
		super('private', msg);
		Object.setPrototypeOf(this, NoPermissionError.prototype);
	}
}

export class MembersOnlyError extends MasterchatError {
	public constructor(msg: string) {
		super('membersOnly', msg);
		Object.setPrototypeOf(this, MembersOnlyError.prototype);
	}
}

export class NoStreamRecordingError extends MasterchatError {
	public constructor(msg: string) {
		super('unarchived', msg);
		Object.setPrototypeOf(this, NoStreamRecordingError.prototype);
	}
}

export class AccessDeniedError extends MasterchatError {
	public constructor(msg: string) {
		super('denied', msg);
		Object.setPrototypeOf(this, AccessDeniedError.prototype);
	}
}

export class InvalidArgumentError extends MasterchatError {
	public constructor(msg: string) {
		super('invalid', msg);
		Object.setPrototypeOf(this, InvalidArgumentError.prototype);
	}
}

export class AbortError extends Error {}
