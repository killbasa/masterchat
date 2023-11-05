import type { Color, Membership, SuperChat, SuperChatColor, SuperChatSignificance } from './misc';
import type { YTRun, YTText } from './yt/chat';

/**
 * Actions
 */

export type Action =
	| AddChatItemAction
	| AddMembershipItemAction
	| AddMembershipMilestoneItemAction
	| AddPlaceholderItemAction
	| AddPollResultAction
	| AddSuperChatItemAction
	| AddSuperChatTickerAction
	| AddSuperStickerItemAction
	| AddViewerEngagementMessageAction
	| MembershipGiftPurchaseAction
	| MembershipGiftRedemptionAction
	| ModeChangeAction
	| ModerationMessageAction;

export type AddChatItemAction = {
	type: 'addChatItemAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;
	/**
	 * message can somehow be a blank (in quite rare occasion though).
	 * We've observed `message: {}` three or four times.
	 * In most cases just `action.message!` would works.
	 */
	message?: YTRun[];
	/** rare but can be undefined */
	authorName?: string;
	authorChannelId: string;
	authorPhoto: string;
	membership?: Membership;
	isOwner: boolean;
	isModerator: boolean;
	isVerified: boolean;
	contextMenuEndpointParams: string;

	/** @deprecated use `message` */
	rawMessage?: YTRun[];
};

export type AddSuperChatItemAction = {
	type: 'addSuperChatItemAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;
	/** rare but can be undefined */
	authorName?: string;
	authorChannelId: string;
	authorPhoto: string;
	message: YTRun[] | null;
	amount: number;
	currency: string;
	color: SuperChatColor;
	significance: SuperChatSignificance;
	authorNameTextColor: Color;
	timestampColor: Color;
	headerBackgroundColor: Color;
	headerTextColor: Color;
	bodyBackgroundColor: Color;
	bodyTextColor: Color;

	/** @deprecated use `message` */
	rawMessage: YTRun[] | undefined;

	/** @deprecated flattened */
	superchat: SuperChat;
};

export type AddSuperStickerItemAction = {
	type: 'addSuperStickerItemAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;
	authorName: string;
	authorChannelId: string;
	authorPhoto: string;
	stickerUrl: string;
	stickerText: string;
	amount: number;
	currency: string;
	stickerDisplayWidth: number;
	stickerDisplayHeight: number;
	moneyChipBackgroundColor: Color;
	moneyChipTextColor: Color;
	backgroundColor: Color;
	authorNameTextColor: Color;
};

export type AddMembershipItemAction = {
	type: 'addMembershipItemAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;

	// `level` is only shown when there's multiple levels available
	level?: string;

	/** Sometimes customThumbnail is not available */
	membership?: Membership;

	/** rare but can be undefined */
	authorName?: string;
	authorChannelId: string;
	authorPhoto: string;
};

export type AddMembershipMilestoneItemAction = {
	type: 'addMembershipMilestoneItemAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;

	/** `level` is only shown when there's multiple levels available */
	level?: string;

	/** Sometimes customThumbnail is not available */
	membership?: Membership;

	authorName?: string;
	authorChannelId: string;
	authorPhoto: string;

	/**
	 * Membership duration in seconds
	 */
	duration: number;

	/**
	 * Human readable membership duration
	 */
	durationText: string;

	/**
	 * Milestone message
	 */
	message: YTRun[] | null;
};

export type AddPlaceholderItemAction = {
	type: 'addPlaceholderItemAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;
};

export type AddSuperChatTickerAction = {
	type: 'addSuperChatTickerAction';
	id: string;
	authorChannelId: string;
	authorPhoto: string;
	amountText: string;
	durationSec: number;
	fullDurationSec: number;
	contents: AddSuperChatItemAction;
	amountTextColor: Color;
	startBackgroundColor: Color;
	endBackgroundColor: Color;
};

export type AddViewerEngagementMessageAction = {
	type: 'addViewerEngagementMessageAction';
	id: string;
	message: YTText;
	actionUrl?: string;
	timestamp: Date;
	timestampUsec: string;
};

export type AddPollResultAction = {
	type: 'addPollResultAction';
	id: string;
	question?: YTRun[];
	total: string;
	choices: PollChoice[];
};

export type PollChoice = {
	text: YTRun[];
	votePercentage: string;
};

export enum LiveChatMode {
	MembersOnly = 'MEMBERS_ONLY',
	Slow = 'SLOW',
	SubscribersOnly = 'SUBSCRIBERS_ONLY',
	Unknown = 'UNKNOWN'
}

export type ModeChangeAction = {
	type: 'modeChangeAction';
	mode: LiveChatMode;
	enabled: boolean;
	description: string;
};

export type MembershipGiftPurchaseAction = {
	type: 'membershipGiftPurchaseAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;
	channelName: string; // MEMO: is it limited for ¥500 membership?
	amount: number; // 5, 10, 20
	membership: Membership;
	authorName: string;
	authorChannelId: string;
	authorPhoto: string;
	image: string; // always https://www.gstatic.com/youtube/img/sponsorships/sponsorships_gift_purchase_announcement_artwork.png
};

export type MembershipGiftPurchaseTickerContent = Omit<MembershipGiftPurchaseAction, 'timestamp' | 'timestampUsec' | 'type'>;

export type MembershipGiftRedemptionAction = {
	type: 'membershipGiftRedemptionAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;
	senderName: string; // author was gifted a membership by sender
	authorName: string;
	authorChannelId: string;
	authorPhoto: string;
};

export type ModerationMessageAction = {
	type: 'moderationMessageAction';
	id: string;
	timestamp: Date;
	timestampUsec: string;
	message: YTRun[];
};

export type UnknownAction = {
	type: 'unknown';
	payload: unknown;
};
