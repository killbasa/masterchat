import { parseAddChatItemAction } from './actions/addChatItemAction';
import { debugLog, omitTrackingParams } from '../utils';
import type { Action, UnknownAction } from '../interfaces/actions';
import type { YTAction } from '../interfaces/yt/chat';

export function parseAction(action: YTAction): Action | UnknownAction {
	const filteredActions = omitTrackingParams(action);
	const type = Object.keys(filteredActions)[0] as keyof typeof filteredActions;

	switch (type) {
		case 'addChatItemAction': {
			const parsed = parseAddChatItemAction(action[type]!);
			if (parsed) return parsed;
			break;
		}

		default: {
			debugLog('[action required] Unrecognized action type:', JSON.stringify(action));
		}
	}

	return {
		type: 'unknown',
		payload: action
	} as UnknownAction;
}
