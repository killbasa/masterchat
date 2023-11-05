import { u8tob64 } from './util';
import { TextEncoder } from 'util';

export enum B64Type {
	B1 = 'b1',
	B2 = 'b2'
}

function urlsafeB64e(payload: Uint8Array): string {
	return encodeURIComponent(u8tob64(payload));
}

export function b64e(payload: Uint8Array, type: B64Type): string {
	switch (type) {
		case B64Type.B1:
			return urlsafeB64e(payload);
		case B64Type.B2: {
			const urlsafe = urlsafeB64e(payload);
			const encoded = new TextEncoder().encode(urlsafe);
			return u8tob64(encoded);
		}
		// return u8tob64(new TextEncoder().encode(urlsafeB64e(payload)));
		default:
			throw new Error(`Invalid b64type: ${type}`);
	}
}
