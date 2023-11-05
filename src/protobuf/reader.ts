export class ProtoBufReader {
	public buf: Uint8Array;
	public c: number;
	public s = 0;

	public constructor(buf: Uint8Array) {
		this.buf = buf;
		this.c = 0;
	}

	public eat(bytes: number): Uint8Array | null {
		if (this.isEnded()) return null;
		return this.buf.slice(this.c, (this.c += bytes));
	}

	public eatUInt32(): number | null {
		if (this.isEnded()) return null;
		try {
			const n = new DataView(this.buf.buffer).getUint32(this.c, true);
			// const n = this.buf.readUInt32LE(this.c);
			this.c += 4;
			return n;
		} catch (err) {
			return null;
		}
	}

	public eatUInt64(): bigint | null {
		if (this.isEnded()) return null;
		try {
			const n = new DataView(this.buf.buffer).getBigUint64(this.c, true);
			// const n = this.buf.readBigUInt64LE(this.c);
			this.c += 8;
			return n;
		} catch (err) {
			return null;
		}
	}

	public eatVariant(): bigint | null {
		if (this.isEnded()) return null;
		const start = this.c;
		while (this.buf[this.c] & 0x80) this.c += 1;
		const rawBuf = this.buf.slice(start, (this.c += 1));
		return ProtoBufReader.parseVariant(rawBuf);
	}

	public save() {
		this.s = this.c;
	}

	public rewind(b?: number) {
		if (b === undefined) {
			this.c = this.s;
		} else {
			this.c -= b;
		}
	}

	public remainingBytes() {
		return this.buf.length - this.c;
	}

	public isEnded(): boolean {
		return this.c === this.buf.length;
	}

	public static splitHeader(n: bigint): [bigint, number] {
		return [n >> 3n, Number(n & 0x7n)];
	}

	public static parseVariant(buf: Uint8Array): bigint {
		return buf.reduce((r, b, i) => r | ((BigInt(b) & 0x7fn) << (BigInt(i) * 7n)), 0n);
	}
}
