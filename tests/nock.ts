import type { BackMode } from 'nock';

export function getMode(): BackMode {
	return process.env.NOCK_BACK_MODE === 'record' ? 'record' : 'lockdown';
}
