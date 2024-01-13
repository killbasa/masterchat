import type { YTAccessibilityData, YTAccessibilityLabel, YTBrowseEndpointContainer, YTReloadContinuation, YTResponseContext } from './context';

// --------------------
// YT Interface
// --------------------

export type YTText = YTRunContainer | YTSimpleTextContainer;

export type YTSimpleTextContainer = {
	simpleText: string;
	accessibility?: YTAccessibilityData;
};

export type YTRunContainer<T = YTRun> = {
	runs: T[];
};

export type YTRun = YTEmojiRun | YTTextRun;

export type YTTextRun = {
	text: string;
	bold?: boolean;
	italics?: boolean;
	navigationEndpoint?: YTBrowseEndpointContainer | YTUrlEndpointContainer | YTWatchEndpointContainer;
};

export type YTEmojiRun = {
	emoji: YTEmoji;
};

export type YTEmoji = {
	emojiId: string;
	shortcuts: string[];
	searchTerms: string[];
	image: YTThumbnailList; // with accessibility
	isCustomEmoji?: boolean;
};

export type YTUrlEndpointContainer = {
	urlEndpoint: YTUrlEndpoint;
	commandMetadata: YTWebPageMetadataContainer;
	clickTrackingParams?: string;
};

export type YTUrlEndpoint = {
	url: string;
	target: YTTarget | string;
	nofollow?: boolean;
};

export enum YTTarget {
	NewWindow = 'TARGET_NEW_WINDOW'
}

// Errors

export type YTChatError = {
	code: number;
	message: string;
	errors: YTChatErrorDetail[];
	status: YTChatErrorStatus;
};

export const YTChatErrorStatus = {
	Unavailable: 'UNAVAILABLE',
	PermissionDenied: 'PERMISSION_DENIED',
	Internal: 'INTERNAL',
	Invalid: 'INVALID_ARGUMENT',
	NotFound: 'NOT_FOUND',
	Unauthenticated: 'UNAUTHENTICATED'
} satisfies Record<string, string>;
export type YTChatErrorStatus = (typeof YTChatErrorStatus)[keyof typeof YTChatErrorStatus];

export type YTChatErrorDetail = {
	message: string;
	domain: 'global';
	reason: 'backendError' | 'badRequest' | 'forbidden' | 'notFound';
};

// Responses

export type YTChatResponse = {
	responseContext: YTResponseContext;
	continuationContents?: YTContinuationContents;
	error?: YTChatError;
	trackingParams: string;
};

export type YTGetItemContextMenuResponse = {
	responseContext: YTResponseContext;
	liveChatItemContextMenuSupportedRenderers?: YTLiveChatItemContextMenuSupportedRenderers;
	error?: YTChatError;
};

// TODO: complete it
// moderate, pin, manage_user
export type YTActionResponse = {
	responseContext: YTResponseContext;
	success: boolean;
	actions: YTAction[];
	timeoutDurationUsec?: string;
	errorMessage?: YTLiveChatTextActionsErrorMessageRenderer;
};

export type YTLiveChatTextActionsErrorMessageRenderer = {
	errorText: YTRunContainer;
	editMessageText: YTRunContainer;
	clickToDismissText: YTRunContainer;
	originalRichMessage: {
		textSegments: YTTextRun[];
	};
};

// Interfaces

export type YTContinuationContents = {
	liveChatContinuation: YTLiveChatContinuation;
};

export type YTLiveChatContinuation = {
	continuations: YTContinuationElement[];
	actions?: YTAction[];
	actionPanel?: YTActionPanel;
	itemList?: YTItemList;
	header?: YTLiveChatContinuationHeader;
	ticker?: YTTicker;
	trackingParams?: string;
	participantsList?: YTParticipantsList;
	popoutMessage?: YTPopoutMessage;
	clientMessages?: YTClientMessages;
};

export type YTContinuationElement = {
	timedContinuationData: YTTimedContinuationData;
};

export type YTTimedContinuationData = {
	timeoutMs: number;
	continuation: string;
	clickTrackingParams: string;
};

// Menu

export type YTLiveChatItemContextMenuSupportedRenderers = {
	menuRenderer: YTMenuRenderer;
};

export type YTMenuRenderer = {
	items: YTMenuRendererItem[];
	trackingParams: string;
	openImmediately: boolean;
};

export type YTMenuRendererItem = {
	menuServiceItemRenderer?: YTMenuServiceItemRenderer;
	menuNavigationItemRenderer?: YTMenuNavigationItemRenderer;
};

export type YTMenuServiceItemRenderer = {
	text: YTRunContainer<YTTextRun>;
	icon: YTIcon;
	trackingParams: string;
	isDisabled?: boolean;
	serviceEndpoint: YTLiveChatServiceEndpointContainer;
};

export type YTMenuNavigationItemRenderer = {
	text: YTRunContainer<YTTextRun>;
	icon: YTIcon;
	navigationEndpoint: YTLiveChatNavigationEndpointContainer;
};

export type YTOverflowMenu = {
	menuRenderer: YTMenuRenderer;
};

export type YTCommandContainer<T> = {
	clickTrackingParams: string;
	commandMetadata: T;
};

export type YTLiveChatServiceEndpointContainer = YTCommandContainer<YTApiEndpointMetadataContainer> & {
	liveChatActionEndpoint?: YTEndpointParamsContainer;
	moderateLiveChatEndpoint?: YTEndpointParamsContainer;
	getReportFormEndpoint?: YTEndpointParamsContainer;
};

export type YTLiveChatNavigationEndpointContainer = YTCommandContainer<YTIgnoreCommandMetadata> & {
	clickTrackingParams: string;
	showLiveChatParticipantsEndpoint?: YTSEndpoint;
	toggleLiveChatTimestampsEndpoint?: YTSEndpoint;
	popoutLiveChatEndpoint?: YTThumbnailWithoutSize;
	feedbackEndpoint?: YTFeedbackEndpoint;
	confirmDialogEndpoint?: YTConfirmDialogEndpoint;
};

export type YTConfirmDialogEndpoint = {
	content: {
		confirmDialogRenderer: YTConfirmDialogRenderer;
	};
};

export type YTConfirmDialogRenderer = {
	title: YTRunContainer;
	trackingParams: string;
	dialogMessages: YTRunContainer;
	confirmButton: YTServiceButtonRendererContainer<YTLiveChatServiceEndpointContainer>;
	cancelButton: YTButtonRenderer;
};

// Action and Commands

export type YTReplayChatItemAction = {
	actions: YTAction[];
};

export type YTAction = {
	clickTrackingParams: string;

	// Chat
	addChatItemAction?: YTAddChatItemAction;
	markChatItemsByAuthorAsDeletedAction?: YTMarkChatItemsByAuthorAsDeletedAction;
	markChatItemAsDeletedAction?: YTMarkChatItemAsDeletedAction;

	// Ticker
	addLiveChatTickerItemAction?: YTAddLiveChatTickerItemAction;

	// Banner
	addBannerToLiveChatCommand?: YTAddBannerToLiveChatCommand;
	removeBannerForLiveChatCommand?: YTRemoveBannerForLiveChatCommand;

	// Placeholder
	replaceChatItemAction: YTReplaceChatItemAction;

	showLiveChatTooltipCommand?: YTShowLiveChatTooltipCommand;

	// Poll related
	showLiveChatActionPanelAction?: YTShowLiveChatActionPanelAction;
	updateLiveChatPollAction?: YTUpdateLiveChatPollAction;
	closeLiveChatActionPanelAction?: YTCloseLiveChatActionPanelAction;
};

export type YTAddChatItemAction = {
	item: YTAddChatItemActionItem;
	clientId?: string;
};

export type YTAddChatItemActionItem =
	| YTLiveChatMembershipItemRendererContainer
	| YTLiveChatModeChangeMessageRendererContainer
	| YTLiveChatModerationMessageRendererContainer
	| YTLiveChatPaidMessageRendererContainer
	| YTLiveChatPaidStickerRendererContainer
	| YTLiveChatPlaceholderItemRendererContainer
	| YTLiveChatSponsorshipsGiftPurchaseAnnouncementRendererContainer
	| YTLiveChatSponsorshipsGiftRedemptionAnnouncementRendererContainer
	| YTLiveChatTextMessageRendererContainer
	| YTLiveChatViewerEngagementMessageRendererContainer;

export type YTAddLiveChatTickerItemAction = {
	item: YTAddLiveChatTickerItem;
	durationSec: string;
};

export type YTReplaceChatItemAction = {
	targetItemId: string;
	replacementItem: YTLiveChatPaidMessageRendererContainer | YTLiveChatPlaceholderItemRendererContainer | YTLiveChatTextMessageRendererContainer; // TODO: check if YTLiveChatPaidMessageRendererContainer will appear
};

export type YTMarkChatItemAsDeletedAction = {
	deletedStateMessage: YTRunContainer<YTTextRun>;
	targetItemId: string;
};

export type YTMarkChatItemsByAuthorAsDeletedAction = {
	deletedStateMessage: YTRunContainer<YTTextRun>;
	externalChannelId: string;
};

export type YTAddBannerToLiveChatCommand = {
	bannerRenderer: YTLiveChatBannerRendererContainer;
};

export type YTRemoveBannerForLiveChatCommand = {
	targetActionId: string;
};

export type YTUpdateLiveChatPollAction = {
	pollToUpdate: YTLiveChatPollRendererContainer;
};

export type YTShowLiveChatActionPanelAction = {
	panelToShow: YTLiveChatActionPanelRendererContainer;
};

export type YTCloseLiveChatActionPanelAction = {
	targetPanelId: string;
	skipOnDismissCommand: boolean;
};

// Containers

export type YTLiveChatTextMessageRendererContainer = {
	liveChatTextMessageRenderer: YTLiveChatTextMessageRenderer;
};

export type YTLiveChatPaidMessageRendererContainer = {
	liveChatPaidMessageRenderer: YTLiveChatPaidMessageRenderer;
};

export type YTLiveChatPaidStickerRendererContainer = {
	liveChatPaidStickerRenderer: YTLiveChatPaidStickerRenderer;
};

export type YTLiveChatMembershipItemRendererContainer = {
	liveChatMembershipItemRenderer: YTLiveChatMembershipItemRenderer;
};

export type YTLiveChatPlaceholderItemRendererContainer = {
	liveChatPlaceholderItemRenderer: YTLiveChatPlaceholderItemRenderer;
};

export type YTLiveChatBannerRendererContainer = {
	liveChatBannerRenderer: YTLiveChatBannerRenderer;
};

export type YTLiveChatViewerEngagementMessageRendererContainer = {
	liveChatViewerEngagementMessageRenderer: YTLiveChatViewerEngagementMessageRenderer;
};

export type YTTooltipRendererContainer = {
	tooltipRenderer: YTTooltipRenderer;
};

export type YTLiveChatPollRendererContainer = {
	pollRenderer: YTLiveChatPollRenderer;
};

export type YTLiveChatModeChangeMessageRendererContainer = {
	liveChatModeChangeMessageRenderer: YTLiveChatModeChangeMessageRenderer;
};

// Only appeared in YTShowLiveChatActionPanelAction
export type YTLiveChatActionPanelRendererContainer = {
	liveChatActionPanelRenderer: YTLiveChatActionPanelRenderer;
};

export type YTLiveChatSponsorshipsGiftPurchaseAnnouncementRendererContainer = {
	liveChatSponsorshipsGiftPurchaseAnnouncementRenderer: YTLiveChatSponsorshipsGiftPurchaseAnnouncementRenderer;
};

export type YTLiveChatSponsorshipsGiftRedemptionAnnouncementRendererContainer = {
	liveChatSponsorshipsGiftRedemptionAnnouncementRenderer: YTLiveChatSponsorshipsGiftRedemptionAnnouncementRenderer;
};

export type YTLiveChatModerationMessageRendererContainer = {
	liveChatModerationMessageRenderer: YTLiveChatModerationMessageRenderer;
};

export type YTLiveChatBannerRedirectRendererContainer = {
	liveChatBannerRedirectRenderer: YTLiveChatBannerRedirectRenderer;
};

// LiveChat Renderers

export type YTLiveChatTextMessageRenderer = {
	id: string;
	timestampUsec: string;
	message: YTRunContainer;
	authorName: YTText;
	authorPhoto: YTThumbnailList;
	authorExternalChannelId: string;

	authorBadges?: YTAuthorBadge[];

	// unavailable in banners
	contextMenuEndpoint?: YTLiveChatItemContextMenuEndpointContainer;
	contextMenuAccessibility?: YTAccessibilityData;
};

export type YTLiveChatPaidMessageRenderer = {
	id: string;
	timestampUsec: string;
	message?: YTRunContainer;
	authorName: YTText;
	authorPhoto: YTThumbnailList;
	authorExternalChannelId: string;
	contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
	contextMenuAccessibility: YTAccessibilityData;

	purchaseAmountText: YTSimpleTextContainer;
	timestampColor: number;
	authorNameTextColor: number;
	headerBackgroundColor: number;
	headerTextColor: number;
	bodyBackgroundColor: number;
	bodyTextColor: number;
	trackingParams: string;
};

export type YTLiveChatPaidStickerRenderer = {
	id: string;
	contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
	contextMenuAccessibility: YTAccessibilityData;
	timestampUsec: string;
	authorPhoto: YTThumbnailList;
	authorName: YTText;
	authorExternalChannelId: string;
	sticker: YTThumbnailList; // with accessibility
	moneyChipBackgroundColor: number;
	moneyChipTextColor: number;
	purchaseAmountText: YTSimpleTextContainer;
	stickerDisplayWidth: number;
	stickerDisplayHeight: number;
	backgroundColor: number;
	authorNameTextColor: number;
	trackingParams: string;
};

/**
 * New Member:
 * headerPrimary: null
 * headerSub: Welcome <tenant> ! (YTRun)
 *
 * Milestone:
 * headerPrimary: Member for 11 months (YTRun)
 * headerSub: <tenant>
 * message: YTRun OR empty: true
 */
export type YTLiveChatMembershipItemRenderer = {
	id: string;
	timestampUsec: string;
	timestampText?: YTSimpleTextContainer; // replay
	authorExternalChannelId: string;
	headerPrimaryText?: YTRunContainer<YTTextRun>; // milestone
	headerSubtext: YTText;
	message?: YTRunContainer; // milestone with message
	empty?: true; // milestone without message
	authorName?: YTText;
	authorPhoto: YTThumbnailList;
	authorBadges: YTLiveChatAuthorBadgeRendererContainer[];
	contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
	contextMenuAccessibility: YTAccessibilityData;
};

export type YTLiveChatPlaceholderItemRenderer = {
	id: string;
	timestampUsec: string;
};

export type YTLiveChatBannerRenderer = {
	actionId: string;
	targetId: string; // live-chat-banner
	contents: YTLiveChatBannerRedirectRendererContainer | YTLiveChatTextMessageRendererContainer;
	header?: YTLiveChatBannerRendererHeader;
	viewerIsCreator: boolean;
};

export type YTLiveChatViewerEngagementMessageRenderer = {
	id: string;
	timestampUsec?: string;
	icon: YTIcon;
	message: YTText;
	actionButton?: YTActionButtonRendererContainer;
	contextMenuEndpoint?: YTLiveChatItemContextMenuEndpointContainer;
};

export type YTTooltipRenderer = {
	// TODO: type promoConfig
	promoConfig: any;
	targetId: string;
	detailsText: YTText;
	suggestedPosition: YTType;
	dismissStrategy: YTType;
	trackingParams: string;
	dwellTimeMs?: string;
};

export type YTPromoConfig = {
	promoId: string; // "tip-edu-c-live-chat-banner-w"
};

export type YTLiveChatPollRenderer = {
	choices: YTLiveChatPollChoice[];
	liveChatPollId: string;
	header: {
		pollHeaderRenderer: {
			pollQuestion?: YTSimpleTextContainer;
			thumbnail: YTThumbnailList;
			metadataText: YTRunContainer<YTTextRun>;
			liveChatPollType: YTLiveChatPollType;
			contextMenuButton: YTContextMenuButtonRendererContainer;
		};
	};
};

export type YTLiveChatActionPanelRenderer = {
	contents: YTLiveChatPollRendererContainer | any;
	id: string;
	targetId: string;
};

export type YTLiveChatBannerRedirectRenderer = {
	bannerMessage: YTRunContainer<YTTextRun>;
	authorPhoto: YTThumbnailList;
	inlineActionButton: YTActionButtonRendererContainer;
	contextMenuButton: YTContextMenuButtonRendererContainer;
};

export type YTLiveChatPollChoice = {
	text: YTText;
	selected: boolean;
	signinEndpoint: YTSignInEndpointContainer;

	/** not available in showLiveChatActionPanelAction event */
	voteRatio?: number; // 0.0 to 1.0

	/** not available in showLiveChatActionPanelAction event */
	votePercentage?: YTSimpleTextContainer; // 73%
};

export enum YTLiveChatPollType {
	Creator = 'LIVE_CHAT_POLL_TYPE_CREATOR'
}

/**
 * YTLiveChatModeChangeMessageRenderer
 *
 * ```
 * # Slow mode
 * icon:    YTIconType.SlowMode
 *          YTIconType.QuestionAnswer (?)
 * text:    [{"text":"Slow mode is on","bold":true}]
 * subtext: [{"text":"Send a message every ","italics":true},{"text":"1 second","italics":true}]
 *
 * # Members-only mode
 * icon:    YTIconType.MembersOnlyMode
 *          YTIconType.QuestionAnswer
 * text:    [{"text":"Members-only mode is on","bold":true}]
 *          [{"text":"Members-only mode is off","bold":true}]
 * subtext: [{"text":"Only members of this channel can send messages","italics":true}]
 *          [{"text":"This channel owner has opened chat to everyone","italics":true}]
 *
 * # Subscribers-only mode
 * icon:    YTIconType.TabSubscription
 *          YTIconType.QuestionAnswer
 * text:    [{"text":"<channel name>","bold":true},{"text":" turned on subscribers-only mode","bold":true}]
 *          [{"text":"<channel name>","bold":true},{"text":" turned off subscribers-only mode","bold":true}]
 * subtext: [{"text":"Only channel subscribers of ","italics":true},{"text":"10 minutes","italics":true},{"text":" or longer can send messages","italics":true}]
 *          [{"text":"Anyone can send a message","italics":true}]
 * ```
 */
export type YTLiveChatModeChangeMessageRenderer = {
	id: string;
	timestampUsec: string;
	icon: YTIcon;
	text: YTText;
	subtext: YTText;
};

// Sponsorships gift purchase announcement
export type YTLiveChatSponsorshipsGiftPurchaseAnnouncementRenderer = {
	id: string;
	/** will be undefined if its container is a ticker */
	timestampUsec?: string;
	authorExternalChannelId: string;
	header: {
		liveChatSponsorshipsHeaderRenderer: YTLiveChatSponsorshipsHeaderRenderer;
	};
};

export type YTLiveChatSponsorshipsHeaderRenderer = {
	authorName: YTSimpleTextContainer;
	authorPhoto: YTThumbnailList;
	primaryText: {
		runs: [
			{ text: 'Gifted '; bold: true },
			{ text: string; bold: true }, // text: "5"
			{ text: ' '; bold: true },
			{ text: string; bold: true }, // text: "Miko Ch. さくらみこ"
			{ text: ' memberships'; bold: true }
		];
	};
	authorBadges: YTLiveChatAuthorBadgeRendererContainer[];
	contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
	contextMenuAccessibility: YTAccessibilityData;
	image: YTThumbnailList; // https://www.gstatic.com/youtube/img/sponsorships/sponsorships_gift_purchase_announcement_artwork.png
};

// Sponsorships gift redemption announcement
export type YTLiveChatSponsorshipsGiftRedemptionAnnouncementRenderer = {
	id: string;
	timestampUsec: string;
	authorExternalChannelId: string;
	authorName: YTSimpleTextContainer;
	authorPhoto: YTThumbnailList;
	message: {
		runs: [
			{ text: 'was gifted a membership by '; italics: true },
			{ text: string; bold: true; italics: true } // text: "User"
		];
	};
	contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
	contextMenuAccessibility: YTAccessibilityData;
	trackingParams: string;
};

// Moderation message
export type YTLiveChatModerationMessageRenderer = {
	message: {
		runs: [
			{ text: string; bold: true; italics: true },
			{
				// TODO: find other variants
				text: ' was hidden by ' | ' was unhidden by ';
				italics: true;
			},
			{ text: string; bold: true; italics: true },
			{ text: '.'; italics: true }
		];
	};
	id: string;
	timestampUsec: string;
};

// Ticker Renderers

export type YTAddLiveChatTickerItem = {
	liveChatTickerPaidMessageItemRenderer?: YTLiveChatTickerPaidMessageItemRenderer; // Super Chat
	liveChatTickerPaidStickerItemRenderer?: YTLiveChatTickerPaidStickerItemRenderer; // Super Sticker
	liveChatTickerSponsorItemRenderer?: YTLiveChatTickerSponsorItemRenderer; // Membership Updates
};

export type YTLiveChatTickerPaidMessageItemRenderer = {
	id: string;
	amount: YTSimpleTextContainer;
	amountTextColor: number;
	startBackgroundColor: number;
	endBackgroundColor: number;
	authorPhoto: YTThumbnailList; // with accessibility
	durationSec: number;
	showItemEndpoint: YTShowLiveChatItemEndpointContainer<YTLiveChatPaidMessageRendererContainer>;
	authorExternalChannelId: string;
	fullDurationSec: number;
	trackingParams: string;
};

export type YTLiveChatTickerPaidStickerItemRenderer = {
	id: string;
	authorPhoto: YTThumbnailList; // with accessibility
	startBackgroundColor: number;
	endBackgroundColor: number;
	durationSec: number;
	fullDurationSec: number;
	showItemEndpoint: YTShowLiveChatItemEndpointContainer<YTLiveChatPaidStickerRendererContainer>;
	authorExternalChannelId: string;
	tickerThumbnails: YTThumbnailList[]; // with accessibility
	trackingParams: string;
};

export type YTLiveChatTickerSponsorItemRenderer = {
	id: string;
	detailIcon?: { iconType: 'GIFT' };
	detailText: YTText;
	detailTextColor: number;
	startBackgroundColor: number;
	endBackgroundColor: number;
	sponsorPhoto: YTThumbnailList;
	durationSec: number;
	showItemEndpoint: YTShowLiveChatItemEndpointContainer<
		YTLiveChatMembershipItemRendererContainer | YTLiveChatSponsorshipsGiftPurchaseAnnouncementRendererContainer
	>;
	authorExternalChannelId: string;
	fullDurationSec: number;
};

// Misc

export type YTShowLiveChatItemEndpointContainer<T> = YTCommandContainer<YTWebPageMetadataContainer> & {
	showLiveChatItemEndpoint: YTRendererContainer<T>;
};

export type YTRendererContainer<T> = {
	renderer: T;
	trackingParams: string;
};

export type YTLiveChatItemContextMenuEndpointContainer = YTCommandContainer<YTIgnoreCommandMetadata> & {
	liveChatItemContextMenuEndpoint: YTEndpointParamsContainer;
};

export type YTUserFeedbackEndpointContainer = YTCommandContainer<YTIgnoreCommandMetadata> & {
	userFeedbackEndpoint: YTUserFeedbackEndpoint;
};

export type YTEndpointParamsContainer = {
	params: string;
};

export type YTActionPanel = {
	liveChatMessageInputRenderer?: {
		inputField: YTInputField;
		sendButton: YTSendButton;
		pickers: YTPicker[];
		pickerButtons: YTPickerButton[];
		interactionMessage: YTInteractionMessage;
	};
};

export type YTInputField = {
	liveChatTextInputFieldRenderer: {
		placeholder: YTText;
		maxCharacterLimit: number;
		emojiCharacterCount: number;
	};
};

export type YTInteractionMessage = {
	messageRenderer: {
		trackingParams: string;
		button: YTSigninButtonRendererContainer;
		subtext: YTMessageSubtextRendererContainer;
	};
};

export type YTAuthorBadge = {
	liveChatAuthorBadgeRenderer: {
		customThumbnail?: YTThumbnailList;
		icon?: YTIcon;
		tooltip: string;
		accessibility: YTAccessibilityData;
	};
};

export type YTSendLiveChatMessageEndpoint = {
	sendLiveChatMessageEndpoint: YTEndpointParamsContainer;
};

export type YTSignInEndpointContainer = {
	signInEndpoint: YTSignInEndpoint;
	commandMetadata: YTWebPageMetadataContainer;
	clickTrackingParams: string;
};

export type YTWatchEndpointContainer = {
	watchEndpoint: YTWatchEndpoint;
	commandMetadata: YTIgnoreCommandMetadata | YTWebPageMetadataContainer;
	clickTrackingParams?: string;
};

export type YTSignInEndpoint = {
	nextEndpoint: NonNullable<unknown> | YTWatchEndpointContainer;
};

export type YTWatchEndpoint = {
	videoId: string;
	playlistId?: string;
	index?: string;
	startTimeSeconds?: number;
	nofollow?: boolean;
	params?: string;
};

export type YTIgnoreCommandMetadata = {
	webCommandMetadata: YTIgnoreWebCommandMetadata;
};
export type YTIgnoreWebCommandMetadata = {
	ignoreNavigation: boolean;
};

export type YTWebPageMetadataContainer = {
	webCommandMetadata: YTWebPageMetadata;
};

export type YTWebPageMetadata = {
	url: string;
	webPageType: YTWebPageType | string;
	rootVe: number; // 83769
};

export type YTApiEndpointMetadataContainer = {
	webCommandMetadata: YTApiEndpointMetadata;
};

export type YTApiEndpointMetadata = {
	sendPost: boolean; // POST or GET
	apiUrl: string; // endpoint url
};

export type YTPopoutLiveChatEndpointContainer = {
	clickTrackingParams: string;
	popoutLiveChatEndpoint: YTThumbnailWithoutSize;
};

export enum YTWebPageType {
	Unknown = 'WEB_PAGE_TYPE_UNKNOWN',
	WebPageTypeBrowse = 'WEB_PAGE_TYPE_BROWSE',
	WebPageTypeChannel = 'WEB_PAGE_TYPE_CHANNEL',
	WebPageTypeSearch = 'WEB_PAGE_TYPE_SEARCH',
	WebPageTypeWatch = 'WEB_PAGE_TYPE_WATCH'
}

export type YTMessageSubtextRendererContainer = {
	messageSubtextRenderer: {
		text: YTText;
	};
};

export type YTIcon = {
	iconType: YTIconType | string;
};

export enum YTIconType {
	Keep = 'KEEP',
	MoreVert = 'MORE_VERT',
	QuestionAnswer = 'QUESTION_ANSWER',
	SlowMode = 'SLOW_MODE',
	MembersOnlyMode = 'MEMBERS_ONLY_MODE',
	TabSubscriptions = 'TAB_SUBSCRIPTIONS',
	BlockUser = 'BLOCK_USER',
	ErrorOutline = 'ERROR_OUTLINE'
}

export type YTPicker = {
	emojiPickerRenderer: EmojiPickerRenderer;
};

export type EmojiPickerRenderer = {
	id: string;
	categories: YTEmojiCategory[];
	categoryButtons: YTCategoryButton[];
	searchPlaceholderText: YTRunContainer;
	searchNoResultsText: YTRunContainer;
	pickSkinToneText: YTRunContainer;
	trackingParams: string;
	clearSearchLabel: string;
	skinToneGenericLabel: string;
	skinToneLightLabel: string;
	skinToneMediumLightLabel: string;
	skinToneMediumLabel: string;
	skinToneMediumDarkLabel: string;
	skinToneDarkLabel: string;
};

export type YTEmojiCategory = {
	emojiPickerCategoryRenderer: {
		categoryId: string;
		title: YTText;
		emojiIds: string[];
		trackingParams: string;
	};
};

export type YTLiveChatAuthorBadgeRendererContainer = {
	liveChatAuthorBadgeRenderer: YTIconButtonRenderer;
};

export type YTThumbnailList = {
	thumbnails: YTThumbnail[];
	accessibility?: YTAccessibilityData;
};

export type YTThumbnail = {
	url: string;
	width?: number;
	height?: number;
};

export type YTThumbnailWithoutSize = {
	url: string;
};

export type YTLiveChatBannerRendererHeader = {
	liveChatBannerHeaderRenderer: {
		icon: YTIcon;
		text: YTRunContainer;
		contextMenuButton: YTContextMenuButtonRendererContainer;
	};
};

export type YTContextMenuButtonRendererContainer<Command = YTLiveChatItemContextMenuEndpointContainer> = {
	buttonRenderer: {
		icon: YTIcon;
		style?: string;
		command?: Command;
		accessibilityData: YTAccessibilityData;
		trackingParams: string;
	};
};

export type YTServiceButtonRendererContainer<T> = {
	buttonRenderer: YTServiceButtonRenderer<T>;
};

export type YTServiceButtonRenderer<Endpoint> = {
	text: YTRunContainer;
	style: string;
	serviceEndpoint: Endpoint;
	trackingParams: string;
};

export type YTButtonRenderer = {
	size: string;
	style: string;
	isDisabled: boolean;
	accessibility: YTAccessibilityLabel;
	trackingParams: string;
};

export type YTIconButtonRenderer = {
	icon: YTIcon;
	tooltip: string;
	categoryId?: string;
	accessibility: YTAccessibilityData;
};

export type YTNavigationButtonRenderer<Endpoint> = YTButtonRenderer & {
	text: YTSimpleTextContainer;
	navigationEndpoint: Endpoint;
};

export type YTIconToggleButtonRenderer = {
	icon: YTIcon;
	tooltip: string;
	toggledIcon: YTIcon;
	targetId: string;
	accessibility: YTAccessibilityData;
	trackingParams: string;
};

export type YTSendButton = {
	buttonRenderer: {
		icon: YTIcon;
		accessibility: YTAccessibilityLabel;
		trackingParams: string;
		serviceEndpoint?: YTSendLiveChatMessageEndpoint;
	}; // YTServiceButtonRenderer
};

export type YTSigninButtonRendererContainer = {
	buttonRenderer: YTNavigationButtonRenderer<YTSignInEndpointContainer>;
};

export type YTActionButtonRendererContainer = {
	buttonRenderer: YTNavigationButtonRenderer<YTUrlEndpointContainer> & {
		accessibilityData: YTAccessibilityData;
	};
};

export type CollapseButton = {
	buttonRenderer: YTButtonRenderer;
};

export type YTPickerButton = {
	liveChatIconToggleButtonRenderer: YTIconToggleButtonRenderer;
};

export type YTCategoryButton = {
	emojiPickerCategoryButtonRenderer: YTIconButtonRenderer;
};

export type YTUserFeedbackEndpoint = {
	hack: boolean;
	bucketIdentifier: string;
};

export type YTSEndpoint = {
	hack: boolean;
};

export type YTFeedbackEndpoint = {
	feedbackToken: string;
	uiActions: UIActions;
};

export type YTShowLiveChatTooltipCommand = {
	tooltip: YTTooltipRendererContainer;
};

export type YTType = {
	type: string;
};

export type UIActions = {
	hideEnclosingContainer: boolean;
};

export type YTClientMessages = {
	reconnectMessage: YTRunContainer;
	unableToReconnectMessage: YTRunContainer;
	fatalError: YTRunContainer;
	reconnectedMessage: YTRunContainer;
	genericError: YTRunContainer;
};

export type YTLiveChatContinuationHeader = {
	liveChatHeaderRenderer: {
		overflowMenu: YTOverflowMenu;
		collapseButton: CollapseButton;
		viewSelector: YTViewSelector;
	};
};

export type YTViewSelector = {
	sortFilterSubMenuRenderer: {
		subMenuItems: YTSubMenuItem[];
		accessibility: YTAccessibilityData;
		trackingParams: string;
	};
};

export type YTSubMenuItem = {
	title: string;
	subtitle: string;
	continuation: YTReloadContinuation;
	selected: boolean;
	accessibility: YTAccessibilityData;
};

export type YTItemList = {
	liveChatItemListRenderer: {
		maxItemsToDisplay: number;
		moreCommentsBelowButton: YTContextMenuButtonRendererContainer;
		enablePauseChatKeyboardShortcuts: boolean;
	};
};

export type YTParticipantsList = {
	liveChatParticipantsListRenderer: {
		title: YTRunContainer;
		backButton: YTContextMenuButtonRendererContainer;
		participants: YTParticipant[];
	};
};

export type YTParticipant = {
	liveChatParticipantRenderer: {
		authorName: YTText;
		authorPhoto: YTThumbnailList;
		authorBadges: YTLiveChatAuthorBadgeRendererContainer[];
	};
};

export type YTPopoutMessage = {
	messageRenderer: {
		text: YTRunContainer;
		trackingParams: string;
		button: YTServiceButtonRendererContainer<YTPopoutLiveChatEndpointContainer>;
	};
};

export type YTTicker = {
	liveChatTickerRenderer: {
		sentinel: boolean;
	};
};
