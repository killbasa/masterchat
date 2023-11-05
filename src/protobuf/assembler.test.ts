import { liveReloadContinuation } from './assembler';
import { expect, it } from 'vitest';

it('can generate lrc', () => {
	expect(liveReloadContinuation({ videoId: 'foo', channelId: 'bar' }, { top: true })).toBe(
		'0ofMyAMxGihDZ3dxQ2dvRFltRnlFZ05tYjI4YUMrcW8zYmtCQlFvRFptOXZJQUU9MAGCAQIIBA%3D%3D'
	);
});
