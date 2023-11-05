import { YTWebPageType } from './chat';
import type {
	UIActions,
	YTApiEndpointMetadataContainer,
	YTIgnoreWebCommandMetadata,
	YTRun,
	YTRunContainer,
	YTSimpleTextContainer,
	YTText
} from './chat';

export type YTResponseContext = {
	serviceTrackingParams: YTServiceTrackingParam[];

	webResponseContextExtensionData: WebResponseContextExtensionData;
};

export type WebResponseContextExtensionData = {
	ytConfigData: YTConfigData;

	webPrefetchData: WebPrefetchData;

	hasDecorated: boolean;
};

export type WebPrefetchData = {
	navigationEndpoints: YTNavigationEndpoint[];
};

export type YTNavigationEndpoint = {
	clickTrackingParams: string;

	commandMetadata: YTAutoplayVideoCommandMetadata;

	watchEndpoint: YTAutoplayVideoWatchEndpoint;
};

export type YTAutoplayVideoWatchEndpoint = {
	videoId: string;

	params: string;

	playerParams: string;

	watchEndpointSupportedPrefetchConfig: YTWatchEndpointSupportedPrefetchConfig;
};

export type YTWatchEndpointSupportedPrefetchConfig = {
	prefetchHintConfig: YTPrefetchHintConfig;
};

export type YTPrefetchHintConfig = {
	prefetchPriority: number;

	countdownUiRelativeSecondsPrefetchCondition: number;
};

export type YTAutoplayVideoCommandMetadata = {
	webCommandMetadata: YTPurpleWebCommandMetadata;
};

export type YTPurpleWebCommandMetadata = {
	url: string;
	webPageType: YTWebPageType;
	rootVe: number;
};

export type YTReloadContinuation = {
	reloadContinuationData: YTReloadContinuationData;
};

export type YTReloadContinuationData = {
	continuation: string;
	clickTrackingParams: string;
};

export type YTDismissButtonClass = {
	buttonRenderer: YTCollapseButtonButtonRenderer;
};

export type YTCollapseButtonButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	accessibility?: YTAccessibilityLabel;
	trackingParams: string;
	text?: YTRunContainer;
};

export type YTAccessibilityData = {
	accessibilityData: YTAccessibilityLabel;
};

export type YTAccessibilityLabel = {
	label: string;
};

export type YTMenuItemRenderer = {
	text: YTRunContainer;
	icon: Icon;
	navigationEndpoint?: MenuNavigationItemRendererNavigationEndpoint;
	trackingParams: string;
	serviceEndpoint?: MenuNavigationItemRendererServiceEndpoint;
};

export type Icon = {
	iconType: string;
};

export type MenuNavigationItemRendererNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: DefaultNavigationEndpointCommandMetadata;
	userFeedbackEndpoint: UserFeedbackEndpoint;
};

export type DefaultNavigationEndpointCommandMetadata = {
	webCommandMetadata: YTIgnoreWebCommandMetadata;
};

export type UserFeedbackEndpoint = {
	hack: boolean;
	bucketIdentifier: string;
};

export type MenuNavigationItemRendererServiceEndpoint = {
	clickTrackingParams: string;
	showLiveChatParticipantsEndpoint?: ShowLiveChatParticipantsEndpointClass;
	popoutLiveChatEndpoint?: PopoutLiveChatEndpoint;
	toggleLiveChatTimestampsEndpoint?: ShowLiveChatParticipantsEndpointClass;
	commandMetadata?: OnResponseReceivedEndpointCommandMetadata;
	signalServiceEndpoint?: ServiceEndpointSignalServiceEndpoint;
};

export type OnResponseReceivedEndpointCommandMetadata = {
	webCommandMetadata: TentacledWebCommandMetadata;
};

export type TentacledWebCommandMetadata = {
	sendPost: boolean;
};

export type PopoutLiveChatEndpoint = {
	url: string;
};

export type ShowLiveChatParticipantsEndpointClass = {
	hack: boolean;
};

export type ServiceEndpointSignalServiceEndpoint = {
	signal: Signal;
	actions: PurpleAction[];
};

export type PurpleAction = {
	clickTrackingParams: string;
	addToPlaylistCommand?: AddToPlaylistCommand;
	openPopupAction?: PurpleOpenPopupAction;
};

export type AddToPlaylistCommand = {
	openMiniplayer: boolean;
	openListPanel: boolean;
	videoId: string;
	listType: ListType;
	onCreateListCommand: YTOnCreateListCommand;
	videoIds: string[];
};

export enum ListType {
	PlaylistEditListTypeQueue = 'PLAYLIST_EDIT_LIST_TYPE_QUEUE'
}

export type YTOnCreateListCommand = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	createPlaylistServiceEndpoint: YTCreatePlaylistServiceEndpoint;
};

export type YTCreatePlaylistServiceEndpoint = {
	videoIds: string[];
	params: string;
};

export type PurpleOpenPopupAction = {
	popup: PurplePopup;
	popupType: PopupType;
};

export type PurplePopup = {
	notificationActionRenderer: NotificationActionRenderer;
};

export type NotificationActionRenderer = {
	responseText: YTSimpleTextContainer;
	trackingParams: string;
};

export type ShortViewCountText = {
	simpleText?: string;
	runs?: YTRun[];
};

export enum PopupType {
	Toast = 'TOAST'
}

export enum Signal {
	ClientSignal = 'CLIENT_SIGNAL'
}

export type ViewSelector = {
	sortFilterSubMenuRenderer: SortFilterSubMenuRenderer;
};

export type SortFilterSubMenuRenderer = {
	subMenuItems: SubMenuItem[];
	accessibility: YTAccessibilityData;
	trackingParams: string;
};

export type SubMenuItem = {
	title: string;
	selected: boolean;
	continuation: YTReloadContinuation;
	accessibility: YTAccessibilityData;
	subtitle: string;
};

export type YTShowHideButton = {
	toggleButtonRenderer: ShowHideButtonToggleButtonRenderer;
};

export type ShowHideButtonToggleButtonRenderer = {
	isToggled: boolean;
	isDisabled: boolean;
	defaultText: YTSimpleTextContainer;
	toggledText: YTSimpleTextContainer;
	trackingParams: string;
};

export type SuperTitleLink = {
	runs: SuperTitleLinkRun[];
};

export type SuperTitleLinkRun = {
	text: string;
	navigationEndpoint?: PurpleNavigationEndpoint;
	loggingDirectives?: any;
};

export type PurpleNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	browseEndpoint?: PurpleBrowseEndpoint;
	urlEndpoint?: PurpleURLEndpoint;
};

export type PurpleBrowseEndpoint = {
	browseId: string;
	params: string;
};

export type PurpleURLEndpoint = {
	url: string;
	target?: string;
	nofollow: boolean;
};

export type UpdatedMetadataEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	updatedMetadataEndpoint: WatchEndpointClass;
};

export type WatchEndpointClass = {
	videoId: string;
};

export type CurrentVideoEndpointClass = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	watchEndpoint: WatchEndpointClass;
};

export type ButtonRendererServiceEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	shareEntityServiceEndpoint: ShareEntityServiceEndpoint;
};

export type ShareEntityServiceEndpoint = {
	serializedShareEntity: string;
	commands: Command[];
};

export type Command = {
	clickTrackingParams: string;
	openPopupAction: CommandOpenPopupAction;
};

export type CommandOpenPopupAction = {
	popup: FluffyPopup;
	popupType: string;
	beReused: boolean;
};

export type FluffyPopup = {
	unifiedSharePanelRenderer: UnifiedSharePanelRenderer;
};

export type UnifiedSharePanelRenderer = {
	trackingParams: string;
	showLoadingSpinner: boolean;
};

export type TopLevelButtonToggleButtonRenderer = {
	style: StyleClass;
	isToggled: boolean;
	isDisabled: boolean;
	defaultIcon: Icon;
	defaultText: YTSimpleTextContainer;
	toggledText: YTSimpleTextContainer;
	accessibility: YTAccessibilityLabel;
	trackingParams: string;
	defaultTooltip: string;
	toggledTooltip: string;
	toggledStyle: StyleClass;
	defaultNavigationEndpoint: DefaultNavigationEndpoint;
	accessibilityData: YTAccessibilityData;
	toggleButtonSupportedData: ToggleButtonSupportedData;
	targetId: string;
};

export type DefaultNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: DefaultNavigationEndpointCommandMetadata;
	modalEndpoint: DefaultNavigationEndpointModalEndpoint;
};

export type DefaultNavigationEndpointModalEndpoint = {
	modal: FluffyModal;
};

export type FluffyModal = {
	modalWithTitleAndButtonRenderer: FluffyModalWithTitleAndButtonRenderer;
};

export type FluffyModalWithTitleAndButtonRenderer = {
	title: YTSimpleTextContainer;
	content: YTSimpleTextContainer;
	button: FluffyButton;
};

export type FluffyButton = {
	buttonRenderer: FluffyButtonRenderer;
};

export type FluffyButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	text: YTSimpleTextContainer;
	navigationEndpoint: StickyNavigationEndpoint;
	trackingParams: string;
};

export type StickyNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	signInEndpoint: FluffySignInEndpoint;
};

export type FluffySignInEndpoint = {
	nextEndpoint: CurrentVideoEndpointClass;
	idamTag: string;
};

export type StyleClass = {
	styleType: StyleTypeEnum;
};

export enum StyleTypeEnum {
	StyleDefaultActive = 'STYLE_DEFAULT_ACTIVE',
	StyleText = 'STYLE_TEXT'
}

export type ToggleButtonSupportedData = {
	toggleButtonIdData: ToggleButtonIDData;
};

export type ToggleButtonIDData = {
	id: string;
};

export type MetadataRowContainerRenderer = {
	rows: Row[];
	collapsedItemCount: number;
	trackingParams: string;
};

export type Row = {
	richMetadataRowRenderer: RichMetadataRowRenderer;
};

export type RichMetadataRowRenderer = {
	contents: RichMetadataRowRendererContent[];
	trackingParams: string;
};

export type RichMetadataRowRendererContent = {
	richMetadataRenderer: RichMetadataRenderer;
};

export type RichMetadataRenderer = {
	style: string;
	thumbnail: Background;
	title: YTSimpleTextContainer;
	subtitle?: YTSimpleTextContainer;
	callToAction: YTSimpleTextContainer;
	callToActionIcon: Icon;
	endpoint: YTBrowseEndpointContainer;
	trackingParams: string;
};

export type YTBrowseEndpointContainer = {
	browseEndpoint: YTBrowseEndpoint;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	clickTrackingParams: string;
};

export type YTBrowseEndpoint = {
	browseId: string;
};

export type Background = {
	thumbnails: Thumbnail[];
};

export type Thumbnail = {
	url: string;
	width: number;
	height: number;
};

export type Owner = {
	videoOwnerRenderer: VideoOwnerRenderer;
};

export type VideoOwnerRenderer = {
	thumbnail: Background;
	title: Byline;
	navigationEndpoint: VideoOwnerRendererNavigationEndpoint;
	subscriberCountText: YTRunContainer;
	trackingParams: string;
	badges: MetadataBadgeRendererContainer[];
	membershipButton: MembershipButton;
};

export type MetadataBadgeRendererContainer = {
	metadataBadgeRenderer: OwnerBadgeMetadataBadgeRenderer;
};

export type OwnerBadgeMetadataBadgeRenderer = {
	icon: Icon;
	style: PurpleStyle;
	label?: string;
	tooltip: string;
	trackingParams: string;
};

export enum PurpleStyle {
	BadgeStyleTypeVerified = 'BADGE_STYLE_TYPE_VERIFIED'
}

export type MembershipButton = {
	buttonRenderer: MembershipButtonButtonRenderer;
};

export type MembershipButtonButtonRenderer = {
	style: string;
	size: string;
	text: YTRunContainer;
	navigationEndpoint: IndigoNavigationEndpoint;
	trackingParams: string;
	accessibilityData: YTAccessibilityData;
	targetId: string;
};

export type IndigoNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: DefaultNavigationEndpointCommandMetadata;
	modalEndpoint: FluffyModalEndpoint;
};

export type FluffyModalEndpoint = {
	modal: TentacledModal;
};

export type TentacledModal = {
	modalWithTitleAndButtonRenderer: TentacledModalWithTitleAndButtonRenderer;
};

export type TentacledModalWithTitleAndButtonRenderer = {
	title: YTSimpleTextContainer;
	content: YTSimpleTextContainer;
	button: TentacledButton;
};

export type TentacledButton = {
	buttonRenderer: TentacledButtonRenderer;
};

export type TentacledButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	text: YTSimpleTextContainer;
	navigationEndpoint: IndecentNavigationEndpoint;
	trackingParams: string;
};

export type IndecentNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	signInEndpoint: ShowLiveChatParticipantsEndpointClass;
};

export type VideoOwnerRendererNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	browseEndpoint: FluffyBrowseEndpoint;
};

export type FluffyBrowseEndpoint = {
	browseId: string;
	canonicalBaseUrl: string;
};

export type Byline = {
	runs: BylineRun[];
};

export type BylineRun = {
	text: string;
	navigationEndpoint: YTBrowseEndpointContainer;
};

export type SubscribeButton = {
	buttonRenderer: SubscribeButtonButtonRenderer;
};

export type SubscribeButtonButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	text: YTRunContainer;
	navigationEndpoint: HilariousNavigationEndpoint;
	trackingParams: string;
	targetId: string;
};

export type HilariousNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: DefaultNavigationEndpointCommandMetadata;
	modalEndpoint: TentacledModalEndpoint;
};

export type TentacledModalEndpoint = {
	modal: StickyModal;
};

export type StickyModal = {
	modalWithTitleAndButtonRenderer: StickyModalWithTitleAndButtonRenderer;
};

export type StickyModalWithTitleAndButtonRenderer = {
	title: YTSimpleTextContainer;
	content: YTSimpleTextContainer;
	button: StickyButton;
};

export type StickyButton = {
	buttonRenderer: StickyButtonRenderer;
};

export type StickyButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	text: YTSimpleTextContainer;
	navigationEndpoint: AmbitiousNavigationEndpoint;
	trackingParams: string;
};

export type AmbitiousNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	signInEndpoint: TentacledSignInEndpoint;
};

export type TentacledSignInEndpoint = {
	nextEndpoint: CurrentVideoEndpointClass;
	continueAction: string;
	idamTag: string;
};

export type YTTwoColumnWatchNextResultsSecondaryResults = {
	secondaryResults: SecondaryResultsSecondaryResults;
};

export type SecondaryResultsSecondaryResults = {
	results: SecondaryResultsResult[];
	trackingParams: string;
	targetId: string;
};

export type SecondaryResultsResult = {
	compactAutoplayRenderer?: CompactAutoplayRenderer;
	compactVideoRenderer?: ResultCompactVideoRenderer;
	continuationItemRenderer?: ContinuationItemRenderer;
};

export type CompactAutoplayRenderer = {
	title: YTSimpleTextContainer;
	toggleDescription: YTRunContainer;
	infoIcon: Icon;
	infoText: YTRunContainer;
	contents: CompactAutoplayRendererContent[];
	trackingParams: string;
};

export type CompactAutoplayRendererContent = {
	compactVideoRenderer: ContentCompactVideoRenderer;
};

export type ContentCompactVideoRenderer = {
	videoId: string;
	thumbnail: Background;
	title: YTSimpleTextContainer;
	longBylineText: BylineText;
	publishedTimeText: YTSimpleTextContainer;
	viewCountText: YTSimpleTextContainer;
	lengthText: YTSimpleTextContainer;
	navigationEndpoint: CompactVideoRendererNavigationEndpoint;
	shortBylineText: BylineText;
	badges: PurpleBadge[];
	channelThumbnail: Background;
	ownerBadges: MetadataBadgeRendererContainer[];
	trackingParams: string;
	shortViewCountText: YTSimpleTextContainer;
	menu: Menu;
	thumbnailOverlays: CompactVideoRendererThumbnailOverlay[];
	accessibility: YTAccessibilityData;
};

export type PurpleBadge = {
	metadataBadgeRenderer: PurpleMetadataBadgeRenderer;
};

export type PurpleMetadataBadgeRenderer = {
	style: FluffyStyle;
	label: Label;
	trackingParams: string;
};

export enum Label {
	ライブ配信中 = 'ライブ配信中',
	新着 = '新着'
}

export enum FluffyStyle {
	BadgeStyleTypeLiveNow = 'BADGE_STYLE_TYPE_LIVE_NOW',
	BadgeStyleTypeSimple = 'BADGE_STYLE_TYPE_SIMPLE'
}

export type BylineText = {
	runs: LongBylineTextRun[];
};

export type LongBylineTextRun = {
	text: string;
	navigationEndpoint: VideoOwnerRendererNavigationEndpoint;
};

export type Menu = {
	menuRenderer: MenuMenuRenderer;
};

export type MenuMenuRenderer = {
	items: FluffyItem[];
	trackingParams: string;
	accessibility: YTAccessibilityData;
	targetId?: string;
};

export type FluffyItem = {
	menuServiceItemRenderer: YTMenuItemRenderer;
};

export type CompactVideoRendererNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	watchEndpoint: PurpleWatchEndpoint;
};

export type PurpleWatchEndpoint = {
	videoId: string;
	nofollow: boolean;
};

export type CompactVideoRendererThumbnailOverlay = {
	thumbnailOverlayTimeStatusRenderer?: PurpleThumbnailOverlayTimeStatusRenderer;
	thumbnailOverlayToggleButtonRenderer?: ThumbnailOverlayToggleButtonRenderer;
	thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
};

export type ThumbnailOverlayNowPlayingRenderer = {
	text: YTRunContainer;
};

export type PurpleThumbnailOverlayTimeStatusRenderer = {
	text: YTSimpleTextContainer;
	style: ThumbnailOverlayTimeStatusRendererStyle;
};

export enum ThumbnailOverlayTimeStatusRendererStyle {
	Default = 'DEFAULT',
	Live = 'LIVE'
}

export type ThumbnailOverlayToggleButtonRenderer = {
	isToggled?: boolean;
	untoggledIcon: Icon;
	toggledIcon: Icon;
	untoggledTooltip: string;
	toggledTooltip: string;
	untoggledServiceEndpoint: UntoggledServiceEndpoint;
	toggledServiceEndpoint?: ToggledServiceEndpoint;
	untoggledAccessibility: YTAccessibilityData;
	toggledAccessibility: YTAccessibilityData;
	trackingParams: string;
};

export type ToggledServiceEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	playlistEditEndpoint: ToggledServiceEndpointPlaylistEditEndpoint;
};

export type ToggledServiceEndpointPlaylistEditEndpoint = {
	playlistId: PlaylistID;
	actions: FluffyAction[];
};

export type FluffyAction = {
	action: HilariousAction;
	removedVideoId: string;
};

export enum HilariousAction {
	ActionRemoveVideoByVideoID = 'ACTION_REMOVE_VIDEO_BY_VIDEO_ID'
}

export enum PlaylistID {
	Wl = 'WL'
}

export type UntoggledServiceEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	playlistEditEndpoint?: UntoggledServiceEndpointPlaylistEditEndpoint;
	signalServiceEndpoint?: UntoggledServiceEndpointSignalServiceEndpoint;
};

export type UntoggledServiceEndpointPlaylistEditEndpoint = {
	playlistId: PlaylistID;
	actions: TentacledAction[];
};

export type TentacledAction = {
	addedVideoId: string;
	action: AmbitiousAction;
};

export enum AmbitiousAction {
	ActionAddVideo = 'ACTION_ADD_VIDEO'
}

export type UntoggledServiceEndpointSignalServiceEndpoint = {
	signal: Signal;
	actions: StickyAction[];
};

export type StickyAction = {
	clickTrackingParams: string;
	addToPlaylistCommand: AddToPlaylistCommand;
};

export type ResultCompactVideoRenderer = {
	videoId: string;
	thumbnail: Background;
	title: YTSimpleTextContainer;
	longBylineText: BylineText;
	publishedTimeText?: YTSimpleTextContainer;
	viewCountText: ShortViewCountText;
	lengthText?: YTSimpleTextContainer;
	navigationEndpoint: CompactVideoRendererNavigationEndpoint;
	shortBylineText: BylineText;
	badges?: PurpleBadge[];
	channelThumbnail: Background;
	ownerBadges?: MetadataBadgeRendererContainer[];
	trackingParams: string;
	shortViewCountText: ShortViewCountText;
	menu: Menu;
	thumbnailOverlays: CompactVideoRendererThumbnailOverlay[];
	accessibility: YTAccessibilityData;
};

export type ContinuationItemRenderer = {
	trigger: string;
	continuationEndpoint: YTContinuationEndpoint;
	button: ContinuationItemRendererButton;
};

export type ContinuationItemRendererButton = {
	buttonRenderer: IndigoButtonRenderer;
};

export type IndigoButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	text: YTRunContainer;
	trackingParams: string;
	command: YTContinuationEndpoint;
};

export type YTContinuationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	continuationCommand: ContinuationCommand;
};

export type ContinuationCommand = {
	token: string;
	request: string;
};

export type FrameworkUpdates = NonNullable<unknown>;

export type OnResponseReceivedEndpoint = {
	clickTrackingParams: string;
	commandMetadata: OnResponseReceivedEndpointCommandMetadata;
	signalServiceEndpoint: OnResponseReceivedEndpointSignalServiceEndpoint;
};

export type OnResponseReceivedEndpointSignalServiceEndpoint = {
	signal: Signal;
	actions: IndigoAction[];
};

export type IndigoAction = {
	clickTrackingParams: string;
	signalAction: SignalAction;
};

export type SignalAction = {
	signal: string;
};

export type Overlay = {
	tooltipRenderer: TooltipRenderer;
};

export type TooltipRenderer = {
	promoConfig: PromoConfig;
	targetId: string;
	text: YTRunContainer;
	detailsText: YTRunContainer;
	dismissButton: DismissButton;
	suggestedPosition: DismissStrategy;
	dismissStrategy: DismissStrategy;
	trackingParams: string;
};

export type DismissButton = {
	buttonRenderer: IndecentButtonRenderer;
};

export type IndecentButtonRenderer = {
	style: string;
	size: string;
	text: YTRunContainer;
	trackingParams: string;
	command: AcceptCommand;
};

export type AcceptCommand = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	feedbackEndpoint: FeedbackEndpoint;
};

export type FeedbackEndpoint = {
	feedbackToken: string;
	uiActions: UIActions;
};

export type DismissStrategy = {
	type: string;
};

export type PromoConfig = {
	promoId: string;
	impressionEndpoints: AcceptCommand[];
	acceptCommand: AcceptCommand;
	dismissCommand: AcceptCommand;
};

export type PlayerOverlays = {
	playerOverlayRenderer: PlayerOverlayRenderer;
};

export type PlayerOverlayRenderer = {
	endScreen: EndScreen;
	autoplay: PlayerOverlayRendererAutoplay;
	shareButton: YTShareButton;
};

export type PlayerOverlayRendererAutoplay = {
	playerOverlayAutoplayRenderer: PlayerOverlayAutoplayRenderer;
};

export type PlayerOverlayAutoplayRenderer = {
	title: YTSimpleTextContainer;
	videoTitle: YTSimpleTextContainer;
	byline: Byline;
	cancelText: YTSimpleTextContainer;
	pauseText: YTSimpleTextContainer;
	background: Background;
	countDownSecs: number;
	nextButton: NextButton;
	trackingParams: string;
	preferImmediateRedirect: boolean;
	videoId: string;
	publishedTimeText: YTSimpleTextContainer;
	webShowNewAutonavCountdown: boolean;
	webShowBigThumbnailEndscreen: boolean;
	shortViewCountText: YTSimpleTextContainer;
};

export type NextButton = {
	buttonRenderer: NextButtonButtonRenderer;
};

export type NextButtonButtonRenderer = {
	navigationEndpoint: CurrentVideoEndpointClass;
	accessibility: YTAccessibilityLabel;
	trackingParams: string;
};

export type EndScreen = {
	watchNextEndScreenRenderer: WatchNextEndScreenRenderer;
};

export type WatchNextEndScreenRenderer = {
	results: WatchNextEndScreenRendererResult[];
	title: YTSimpleTextContainer;
	trackingParams: string;
};

export type WatchNextEndScreenRendererResult = {
	endScreenVideoRenderer: EndScreenVideoRenderer;
};

export type EndScreenVideoRenderer = {
	videoId: string;
	thumbnail: Background;
	title: YTSimpleTextContainer;
	shortBylineText: BylineText;
	lengthText?: YTSimpleTextContainer;
	lengthInSeconds?: number;
	navigationEndpoint: CurrentVideoEndpointClass;
	trackingParams: string;
	shortViewCountText: ShortViewCountText;
	publishedTimeText: YTSimpleTextContainer;
	thumbnailOverlays: EndScreenVideoRendererThumbnailOverlay[];
};

export type EndScreenVideoRendererThumbnailOverlay = {
	thumbnailOverlayTimeStatusRenderer?: FluffyThumbnailOverlayTimeStatusRenderer;
	thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
};

export type FluffyThumbnailOverlayTimeStatusRenderer = {
	text: YTText;
	style: ThumbnailOverlayTimeStatusRendererStyle;
	icon?: Icon;
};

export type YTShareButton = {
	buttonRenderer: ShareButtonButtonRenderer;
};

export type ShareButtonButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	icon: Icon;
	navigationEndpoint: CunningNavigationEndpoint;
	tooltip: string;
	trackingParams: string;
};

export type CunningNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: DefaultNavigationEndpointCommandMetadata;
	shareEntityEndpoint: ShareEntityEndpoint;
};

export type ShareEntityEndpoint = {
	serializedShareEntity: string;
};

export type YTServiceTrackingParam = {
	service: string;
	params: YTParam[];
};

export type YTParam = {
	key: string;
	value: string;
};

export type YTConfigData = {
	visitorData: string;
	rootVisualElementType: number;
};

export type Topbar = {
	desktopTopbarRenderer: DesktopTopbarRenderer;
};

export type DesktopTopbarRenderer = {
	logo: Logo;
	searchbox: Searchbox;
	trackingParams: string;
	countryCode: string;
	topbarButtons: TopbarButton[];
	hotkeyDialog: HotkeyDialog;
	backButton: BackButtonClass;
	forwardButton: BackButtonClass;
	a11ySkipNavigationButton: A11YSkipNavigationButton;
};

export type A11YSkipNavigationButton = {
	buttonRenderer: A11YSkipNavigationButtonButtonRenderer;
};

export type A11YSkipNavigationButtonButtonRenderer = {
	style: string;
	size: string;
	isDisabled: boolean;
	text: YTRunContainer;
	trackingParams: string;
	command: OnResponseReceivedEndpoint;
};

export type BackButtonClass = {
	buttonRenderer: BackButtonButtonRenderer;
};

export type BackButtonButtonRenderer = {
	trackingParams: string;
	command: OnResponseReceivedEndpoint;
};

export type HotkeyDialog = {
	hotkeyDialogRenderer: HotkeyDialogRenderer;
};

export type HotkeyDialogRenderer = {
	title: YTRunContainer;
	sections: HotkeyDialogRendererSection[];
	dismissButton: YTDismissButtonClass;
	trackingParams: string;
};

export type HotkeyDialogRendererSection = {
	hotkeyDialogSectionRenderer: HotkeyDialogSectionRenderer;
};

export type HotkeyDialogSectionRenderer = {
	title: YTRunContainer;
	options: Option[];
};

export type Option = {
	hotkeyDialogSectionOptionRenderer: HotkeyDialogSectionOptionRenderer;
};

export type HotkeyDialogSectionOptionRenderer = {
	label: YTRunContainer;
	hotkey: string;
	hotkeyAccessibilityLabel?: YTAccessibilityData;
};

export type Logo = {
	topbarLogoRenderer: TopbarLogoRenderer;
};

export type TopbarLogoRenderer = {
	iconImage: Icon;
	tooltipText: YTRunContainer;
	endpoint: YTBrowseEndpointContainer;
	trackingParams: string;
};

export type Searchbox = {
	fusionSearchboxRenderer: FusionSearchboxRenderer;
};

export type FusionSearchboxRenderer = {
	icon: Icon;
	placeholderText: YTRunContainer;
	config: FusionSearchboxRendererConfig;
	trackingParams: string;
	searchEndpoint: FusionSearchboxRendererSearchEndpoint;
};

export type FusionSearchboxRendererConfig = {
	webSearchboxConfig: WebSearchboxConfig;
};

export type WebSearchboxConfig = {
	requestLanguage: string;
	requestDomain: string;
	hasOnscreenKeyboard: boolean;
	focusSearchbox: boolean;
};

export type FusionSearchboxRendererSearchEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	searchEndpoint: SearchEndpointSearchEndpoint;
};

export type SearchEndpointSearchEndpoint = {
	query: string;
};

export type TopbarButton = {
	topbarMenuButtonRenderer?: TopbarMenuButtonRenderer;
	buttonRenderer?: TopbarButtonButtonRenderer;
};

export type TopbarButtonButtonRenderer = {
	style: string;
	size: string;
	text: YTRunContainer;
	icon: Icon;
	navigationEndpoint: MagentaNavigationEndpoint;
	trackingParams: string;
	targetId: string;
};

export type MagentaNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	signInEndpoint: StickySignInEndpoint;
};

export type StickySignInEndpoint = {
	idamTag: string;
};

export type TopbarMenuButtonRenderer = {
	icon: Icon;
	menuRenderer?: TopbarMenuButtonRendererMenuRenderer;
	trackingParams: string;
	accessibility: YTAccessibilityData;
	tooltip: string;
	style: string;
	targetId?: string;
	menuRequest?: MenuRequest;
};

export type TopbarMenuButtonRendererMenuRenderer = {
	multiPageMenuRenderer: MenuRendererMultiPageMenuRenderer;
};

export type MenuRendererMultiPageMenuRenderer = {
	sections: MultiPageMenuRendererSection[];
	trackingParams: string;
};

export type MultiPageMenuRendererSection = {
	multiPageMenuSectionRenderer: MultiPageMenuSectionRenderer;
};

export type MultiPageMenuSectionRenderer = {
	items: MultiPageMenuSectionRendererItem[];
	trackingParams: string;
};

export type MultiPageMenuSectionRendererItem = {
	compactLinkRenderer: CompactLinkRenderer;
};

export type CompactLinkRenderer = {
	icon: Icon;
	title: YTRunContainer;
	navigationEndpoint: CompactLinkRendererNavigationEndpoint;
	trackingParams: string;
};

export type CompactLinkRendererNavigationEndpoint = {
	clickTrackingParams: string;
	commandMetadata: YTAutoplayVideoCommandMetadata;
	urlEndpoint: FluffyURLEndpoint;
};

export type FluffyURLEndpoint = {
	url: string;
	target: string;
};

export type MenuRequest = {
	clickTrackingParams: string;
	commandMetadata: YTApiEndpointMetadataContainer;
	signalServiceEndpoint: MenuRequestSignalServiceEndpoint;
};

export type MenuRequestSignalServiceEndpoint = {
	signal: string;
	actions: YTIndecentAction[];
};

export type YTIndecentAction = {
	clickTrackingParams: string;
	openPopupAction: FluffyOpenPopupAction;
};

export type FluffyOpenPopupAction = {
	popup: TentacledPopup;
	popupType: string;
	beReused: boolean;
};

export type TentacledPopup = {
	multiPageMenuRenderer: PopupMultiPageMenuRenderer;
};

export type PopupMultiPageMenuRenderer = {
	trackingParams: string;
	style: string;
	showLoadingSpinner: boolean;
};

export type YTWebWatchNextResponseExtensionData = {
	relatedVideoArgs: string;
};
