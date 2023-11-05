export type PBValue = PBToken[] | bigint | number | string;

export type PBToken = {
	fid: bigint;
	type: PBType;
	v: PBValue;
};

export enum PBType {
	V = 0, // variant
	F64 = 1, // fixed 64
	LD = 2, // length-delimited
	StartGroup = 3, // deprecated
	EndGroup = 4, // deprecated
	F32 = 5 // fixed64
}
