export function bitou8(n: bigint | number): Uint8Array {
	let hv = n.toString(16);
	hv = ''.padStart(hv.length % 2, '0') + hv;
	return hextou8(hv);
}

export function concatu8(args: Uint8Array[]): Uint8Array {
	let totalLength = 0;
	for (const arg of args) {
		totalLength += arg.length;
	}

	const out = new Uint8Array(totalLength);
	let offset = 0;
	for (const arg of args) {
		out.set(arg, offset);
		offset += arg.length;
	}
	return out;
}

export function hextou8(data: string): Uint8Array {
	data = data.startsWith('0x') || data.startsWith('0X') ? data.substring(2) : data;
	const out = new Uint8Array(data.length / 2);
	for (let i = 0; i < out.length; ++i) {
		out[i] = parseInt(data.substr(i * 2, 2), 16);
	}
	return out;
}

export function u8tohex(data: Uint8Array): string {
	let out = '';
	for (const item of data) {
		out += item.toString(16).padStart(2, '0');
	}
	return out;
}

const _atob = globalThis.atob as ((data: string) => string) | undefined;
const _btoa = globalThis.btoa as ((data: string) => string) | undefined;

export const b64tou8 = _atob
	? (data: string) => Uint8Array.from(_atob(data), (c) => c.charCodeAt(0))
	: (data: string) => {
			const buf = Buffer.from(data, 'base64');
			return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
		};

export const u8tob64 = _btoa
	? (data: Uint8Array) => _btoa(String.fromCharCode.apply(null, data as any))
	: (data: Uint8Array) => Buffer.from(data).toString('base64');
