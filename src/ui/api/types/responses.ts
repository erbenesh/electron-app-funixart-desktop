// API Response Types
import type {
    Article,
    ArticleComment,
    Badge,
    Channel,
    Collection,
    CollectionComment,
    Episode,
    Profile,
    Release,
    ReleaseComment,
    ReleaseVideo,
    ReleaseVideoCategory,
    Source,
    Type
} from '../../types/entities';

// Base Response
export interface BaseResponse {
  code: number;
}

export enum ResponseCode {
  SUCCESSFUL = 0,
  FAILED = 1,
  INVALID_LOGIN = 2,
  INVALID_EMAIL = 3,
  INVALID_PASSWORD = 4,
  LOGIN_ALREADY_TAKEN = 5,
  EMAIL_ALREADY_TAKEN = 6,
  CODE_ALREADY_SEND = 7,
  CODE_CANNOT_SEND = 8,
  EMAIL_SERVICE_DISALLOWED = 9,
  TOO_MANY_REGISTRATIONS = 10,
  BANNED = 402,
  PERM_BANNED = 403,
}

// Pageable Response
export interface PageableResponse<T> extends BaseResponse {
  content: T[];
  totalCount: number;
  totalPageCount: number;
  currentPage: number;
}

// Auth Responses
export interface ProfileToken {
  token: string;
  expiresAt?: number;
}

export interface SignInResponse extends BaseResponse {
  profile?: Profile;
  profileToken?: ProfileToken;
}

export interface SignUpResponse extends BaseResponse {
  hash: string;
  codeTimestampExpires: number;
}

export interface GoogleResponse extends BaseResponse {
  profile?: Profile;
  profileToken?: ProfileToken;
}

export interface VkResponse extends BaseResponse {
  profile?: Profile;
  profileToken?: ProfileToken;
}

export interface VerifyResponse extends BaseResponse {
  profile?: Profile;
  profileToken?: ProfileToken;
}

export interface ResendResponse extends BaseResponse {}

export interface RestoreResponse extends BaseResponse {}

export interface RestoreResendResponse extends BaseResponse {}

export interface RestoreVerifyResponse extends BaseResponse {
  profile?: Profile;
  profileToken?: ProfileToken;
}

export interface FirebaseResponse extends BaseResponse {}

// Release Responses
export interface ReleaseResponse extends BaseResponse {
  release?: Release;
}

export interface VoteReleaseResponse extends BaseResponse {
  release?: Release;
}

export interface DeleteVoteReleaseResponse extends BaseResponse {}

// Comment Responses
export interface CommentAddResponse<T extends ReleaseComment | CollectionComment | ArticleComment = ReleaseComment> extends BaseResponse {
  comment?: T;
}

export enum CommentAddResponseCode {
  EMBEDDABLE_NOT_FOUND = 2,
  COMMENT_NOT_FOUND = 3,
  PROFILE_NOT_FOUND = 4,
  COMMENT_IS_TOO_SHORT = 5,
  COMMENT_IS_TOO_LONG = 6,
  COMMENT_LIMIT_REACHED = 7,
  IN_BLOCKLIST = 8,
}

export interface CommentEditResponse extends BaseResponse {
  comment?: ReleaseComment | CollectionComment | ArticleComment;
}

export interface CommentDeleteResponse extends BaseResponse {}

// Profile Responses
export interface ProfileResponse extends BaseResponse {
  profile?: Profile;
  isMyProfile?: boolean;
}

export interface ProfileInfoResponse extends BaseResponse {
  // Profile info
}

export interface ProfileSocialResponse extends BaseResponse {
  // Social data
}

export interface ProfilePreferenceResponse extends BaseResponse {
  // Preference data
}

export interface ChangeLoginResponse extends BaseResponse {}

export interface ChangeLoginInfoResponse extends BaseResponse {
  // Login change info
}

export interface ChangeEmailResponse extends BaseResponse {}

export interface ChangeEmailConfirmResponse extends BaseResponse {}

export interface ChangePasswordResponse extends BaseResponse {}

export interface GoogleBindResponse extends BaseResponse {}

export interface GoogleUnbindResponse extends BaseResponse {}

export interface VkBindResponse extends BaseResponse {}

export interface VkUnbindResponse extends BaseResponse {}

export interface SocialEditResponse extends BaseResponse {}

export interface SendFriendRequestResponse extends BaseResponse {}

export interface RemoveFriendRequestResponse extends BaseResponse {}

export interface ProfileListResponse extends BaseResponse {
  // List data
}

// Collection Responses
export interface CollectionResponse extends BaseResponse {
  collection?: Collection;
}

export interface CollectionCreateEditResponse extends BaseResponse {
  collection?: Collection;
}

export interface CollectionDeleteResponse extends BaseResponse {}

export interface CollectionEditImageResponse extends BaseResponse {}

export interface FavoriteCollectionAddResponse extends BaseResponse {}

export interface FavoriteCollectionDeleteResponse extends BaseResponse {}

export interface ReleaseAddCollectionResponse extends BaseResponse {}

// Article Responses
export interface ArticleResponse extends BaseResponse {
  article?: Article;
}

export interface ArticleCreateEditResponse extends BaseResponse {
  article?: Article;
}

export interface ArticleDeleteResponse extends BaseResponse {}

export interface LatestArticleResponse extends BaseResponse {
  article?: Article;
}

export interface EditorAvailableResponse extends BaseResponse {
  available: boolean;
}

export interface ArticleSuggestionPublishResponse extends BaseResponse {}

export interface ArticleSuggestionDeleteResponse extends BaseResponse {}

// Channel Responses
export interface ChannelResponse extends BaseResponse {
  channel?: Channel;
}

export interface ChannelCreateEditResponse extends BaseResponse {
  channel?: Channel;
}

export interface BlogCreateResponse extends BaseResponse {
  channel?: Channel;
}

export interface ChannelSubscribeResponse extends BaseResponse {}

export interface ChannelUnsubscribeResponse extends BaseResponse {}

export interface ChannelBlockResponse extends BaseResponse {}

export interface ChannelPermissionManageResponse extends BaseResponse {}

export interface ChannelUploadCoverAvatarResponse extends BaseResponse {
  url?: string;
}

// Episode Responses

export interface TypesResponse extends BaseResponse {
  types?: Type[];
}

export interface SourcesResponse extends BaseResponse {
  sources?: Source[];
}

export interface EpisodeResponse extends BaseResponse {
  episodes?: Episode[];
}

export interface EpisodeTargetResponse extends BaseResponse {
  episode?: Episode;
}

export interface EpisodeWatchResponse extends BaseResponse {
  episode?: Episode;
}

// Release Video Responses

export interface ReleaseVideosResponse extends BaseResponse {
  videos?: ReleaseVideo[];
}

export interface ReleaseVideoAppealResponse extends BaseResponse {}

export interface ReleaseVideoCategoriesResponse extends BaseResponse {
  categories?: ReleaseVideoCategory[];
}

// Search Responses
export interface ReleaseSearchResponse extends BaseResponse {
  releases?: Release[];
  totalCount?: number;
}

export interface FeedSearchResponse extends BaseResponse {
  // Feed search results
}

// Other Responses
export interface FavoritesResponse extends BaseResponse {}

export interface HistoryResponse extends BaseResponse {}

export interface ReportResponse extends BaseResponse {}

export interface ScheduleResponse extends BaseResponse {
  schedule?: {
    monday?: any[];
    tuesday?: any[];
    wednesday?: any[];
    thursday?: any[];
    friday?: any[];
    saturday?: any[];
    sunday?: any[];
  };
}

export interface AchievementResponse extends BaseResponse {
  achievement?: any; // TODO: Define Achievement type
}

export interface ConfigUrlsResponse extends BaseResponse {
  urls?: Record<string, string>;
}

export interface TogglesResponse extends BaseResponse {
  toggles?: Record<string, boolean>;
}

export interface SubscriptionCountResponse extends BaseResponse {
  count?: number;
}

export interface NotificationCountResponse extends BaseResponse {
  count?: number;
}

export interface BookmarksExportResponse extends BaseResponse {
  data?: string;
}

export interface BookmarksImportResponse extends BaseResponse {}

export interface BookmarksImportStatusResponse extends BaseResponse {
  status?: string;
}

export interface TypeResponse extends BaseResponse {
  types?: Type[];
}

export interface ProfileSelectThemeResponse extends BaseResponse {}

export interface ProfileReleaseTypeNotificationPreferencesResponse extends BaseResponse {}

export interface NotificationPreferenceResponse extends BaseResponse {}

export interface ProfileBadgePageableResponse extends PageableResponse<Badge> {}

export interface TorlookPageableResponse<T = any> extends PageableResponse<T> {}

export interface BlockProfileListAddResponse extends BaseResponse {}

