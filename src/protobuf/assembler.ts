import { B64Type, b64e } from './b64';
import { bitou8, concatu8 as cc, u8tob64 } from './util';
import { TextEncoder } from 'util';

export type CVPair = {
	channelId: string;
	videoId: string;
};

export type CscOptions = {
	top?: boolean;
	highlightedCommentId?: string;
};

export function liveReloadContinuation(origin: CVPair, { top = false }: { top?: boolean } = {}): string {
	const chatType = top ? 4 : 1;
	return b64e(ld(119693434, [ld(3, hdt(origin)), vt(6, 1), ld(16, vt(1, chatType))]), B64Type.B1);
}

export function liveTimedContinuation(
	origin: CVPair,
	{ top = false, since = new Date() }: { top?: boolean; isOwner?: boolean; since?: Date } = {}
): string {
	const chatType = top ? 4 : 1;
	const t1 = Date.now() * 1000;
	const t2 = since.getTime() * 1000;
	return b64e(
		ld(119693434, [
			ld(3, hdt(origin)),
			vt(5, t2),
			vt(6, 0),
			vt(8, 1),
			ld(9, [vt(1, 1), vt(3, 0), vt(4, 0), vt(10, t1), vt(11, 3), vt(15, 0)]),
			vt(10, t1),
			vt(11, t1),
			ld(16, vt(1, chatType)),
			vt(17, 0),
			vt(20, t1)
		]),
		B64Type.B1
	);
}

export function replayReloadContinuation(origin: CVPair, { top = false, seekMs = 0 }: { top?: boolean; seekMs?: number } = {}): string {
	const chatType = top ? 4 : 1;
	return b64e(ld(156074452, [ld(3, hdt(origin)), vt(8, 1), ld(11, vt(2, seekMs)), ld(14, vt(1, chatType)), vt(15, 1)]), B64Type.B1);
}

export function replayTimedContinuation(origin: CVPair, { top = false, seekMs = 0 }: { top?: boolean; seekMs?: number } = {}): string {
	const chatType = top ? 4 : 1;
	return b64e(
		ld(156074452, [
			ld(3, hdt(origin)),
			vt(5, seekMs),
			vt(8, 0),
			vt(9, 4), // 3
			ld(10, vt(4, 0)),
			ld(14, vt(1, chatType)),
			vt(15, 0)
		]),
		B64Type.B1
	);
}

/**
 * Utils
 */

function cvToken(p: CVPair) {
	return ld(5, [ld(1, p.channelId), ld(2, p.videoId)]);
}

function hdt(tgt: CVPair): string {
	return u8tob64(cc([ld(1, cvToken(tgt)), ld(3, ld(48687757, ld(1, tgt.videoId))), vt(4, 1)]));
}

/**
 * Builder
 */

function ld(fid: bigint | number, payload: Uint8Array | Uint8Array[] | string): Uint8Array {
	const b = typeof payload === 'string' ? new TextEncoder().encode(payload) : Array.isArray(payload) ? cc(payload) : payload;
	const bLen = b.byteLength;
	return cc([bitou8(pbh(fid, 2)), bitou8(encv(BigInt(bLen))), b]);
}

function vt(fid: bigint | number, payload: bigint | number): Uint8Array {
	return cc([bitou8(pbh(fid, 0)), bitou8(payload)]);
}

// function f3(fid: bigint | number, payload: bigint): Buffer {
//   while (payload >> 8n) {
//     const b = payload & 8n;
//   }
// }

function pbh(fid: bigint | number, type: number): bigint {
	return encv((BigInt(fid) << 3n) | BigInt(type));
}

function encv(n: bigint): bigint {
	let s = 0n;
	while (n >> 7n) {
		s = (s << 8n) | 0x80n | (n & 0x7fn);
		n >>= 7n;
	}
	s = (s << 8n) | n;
	return s;
}
