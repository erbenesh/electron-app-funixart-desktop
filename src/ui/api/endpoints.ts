
// API URLs
export const BASE_URL = "https://api.anixart.tv/"
export const ALT_URL = "https://api-s2.anixart.tv/"

export const USER_AGENT = "AnixartApp/8.2.1-23121216 (Android 9; SDK 28; arm64-v8a; samsung SM-G975N; en)"

// Re-export types for convenience
export * from './types'

// Comment
export enum EComment {
  DISLIKE = 1,
  LIKE = 2
}

// Vote
export enum EVote {
  LAST_FIRST = 1,
  OLD_FIRST = 2,
  STAR_5 = 3,
  STAR_4 = 4,
  STAR_3 = 5,
  STAR_2 = 6,
  STAR_1 = 7
}

// Lists
export enum ELists {
  WATCHING = 1,
  IN_PLANS = 2,
  WATCHED = 3,
  POSTPONED = 4,
  DROPPED = 5
}

// Auth API

// POST
export const FIREBASE = "auth/firebase"

export const SIGN_UP = "auth/signUp"
export const SIGN_UP_VERIFY = "auth/verify"
export const SIGN_UP_WITH_GOOGLE = "auth/google"
export const SIGN_UP_WITH_VK = "auth/vk"

export const SIGN_IN = "auth/signIn"
export const AUTH_SIGN_IN_WITH_GOOGLE = "auth/google"
export const AUTH_SIGN_IN_WITH_VK = "auth/vk"

export const AUTH_RESEND = "auth/resend"

export const AUTH_RESTORE = "auth/restore"
export const AUTH_RESTORE_RESEND = "auth/restore/resend"
export const AUTH_RESTORE_VERIFY = "auth/restore/verify"

//Achievement API

// GET

export const ACHIEVEMENT_GET = "achievement/get/"//{id}

// Feed API

//POST
export const FEED_MY = "feed/my/all/"//{page}
export const FEED_NEWS = "feed/news/all/"//{page}

// Channel API

// GET
export const CHANNEL = "channel/"//{c_id}
export const CHANNEL_BLOG = "channel/blog/"//{p_id}
export const CHANNEL_BLOCKS = "channel/"//{c_id}/block/all/{page}
export const CHANNEL_BLOCK = "channel/"//{c_id}/block/{p_id}
export const CHANNEL_SUBS_ALL = "channel/subscription/all/"//{page}
export const CHANNEL_SUBSCRIPTION_COUNT = "channel/subscription/count"
export const CHANNEL_SUBSCRIBERS = "channel/"//{c_id}/subscriber/all/{page}
export const CHANNEL_EDITOR_AVAILABLE = "channel/"//{c_id}/editor/available

// POST
export const CHANNEL_CREATE = "channel/create"
export const CHANNEL_BLOG_CREATE = "channel/blog/create"
export const CHANNEL_EDIT = "channel/edit/"//{c_id}
export const CHANNEL_ALL = "channel/all/"//{page}
export const CHANNEL_RECOMMENDATIONS = "channel/recommendations/"//{page}
export const CHANNEL_SUBSCRIBE = "channel/subscribe/"//{c_id}
export const CHANNEL_UNSUBSCRIBE = "channel/unsubscribe/"//{c_id}
export const CHANNEL_BLOCK_MANAGE = "channel/"//{c_id}/block/manage
export const CHANNEL_PERMISSION_MANAGE = "channel/"//{c_id}/permission/manage
export const CHANNEL_PERMISSIONS = "channel/"//{c_id}/permission/all/{page}
export const CHANNEL_AVATAR_UPLOAD = "channel/avatar/upload/"//{c_id}
export const CHANNEL_COVER_UPLOAD = "channel/cover/upload/"//{c_id}

// Article API

// GET
export const ARTICLE = "article/"//{a_id}
export const ARTICLE_VOTE = "article/vote/"//{a_id}/{vote}
export const ARTICLE_REPOSTS = "article/reposts/"//{a_id}/{page}

// POST
export const ARTICLE_ALL = "article/all/"//{page}
export const ARTICLE_CREATE = "article/create/"//{c_id}
export const ARTICLE_DELETE = "article/delete/"//{a_id}
export const ARTICLE_EDIT = "article/edit/"//{a_id}
export const ARTICLE_LATEST = "article/latest"
export const ARTICLE_LATEST_ALL = "article/latest/all/"//{page}
export const ARTICLE_VOTES = "article/votes/"//{a_id}/{page}

// Article Comment API

//GET
export const ARTICLE_COMMENT = "article/comment/"//{articleId}
export const ARTICLE_COMMENT_ALL = "article/comment/all/"//{a_id}/{page}
export const ARTICLE_COMMENT_ALL_POPULAR = "article/comment/all/"//{a_id}/popular
export const ARTICLE_COMMENT_DELETE = "article/comment/delete/"//{commentId}
export const ARTICLE_COMMENT_ALL_PROFILE = "article/comment/all/profile/"//{p_id}/{page}
export const ARTICLE_COMMENT_VOTE = "article/comment/vote/"//{commentId}/{vote}

//POST
export const ARTICLE_COMMENT_ADD = "article/comment/add/"//{articleId}
export const ARTICLE_COMMENT_EDIT = "article/comment/edit/"//{commentId}
export const ARTICLE_COMMENT_PROCESS = "article/comment/process/"//{commentId}
export const ARTICLE_COMMENT_REPLIES = "article/comment/replies/"//{commentId}/{page}
export const ARTICLE_COMMENT_REPORT = "article/comment/report/"//{commentId}
export const ARTICLE_COMMENT_VOTES = "article/comment/votes/"//{commentId}/{page}

// Article Suggestion API
export const ARTICLE_SUGGESTION = "article/suggestion/"//{a_id}
export const ARTICLE_SUGGESTION_ALL = "article/suggestion/all/"//{page}
export const ARTICLE_SUGGESTION_CREATE = "article/suggestion/create/"//{b_id}
export const ARTICLE_SUGGESTION_DELETE = "article/suggestion/delete/"//{a_id}
export const ARTICLE_SUGGESTION_EDIT = "article/suggestion/edit/"//{a_id}
export const ARTICLE_SUGGESTION_PUBLISH = "article/suggestion/publish/"//{a_id}


// Collection API

// GET
export const COLLECTION = "collection/"//{id}
export const COLLECTION_PROFILE = "collection/all/profile/"//{p_id}/{page}
export const COLLECTION_RELEASES = "collection/"//{id}/releases/{page}
export const COLLECTION_RELEASE = "collection/all/release/"//{r_id}/{page}
export const COLLECTION_LIST = "collection/all/"//{page}

export const COLLECTION_COMMENT = "collection/comment/"//{collectionId}
export const COLLECTION_COMMENTS = "collection/comment/all/"//{collectionId}/{page}
export const COLLECTION_COMMENTS_DELETE = "collection/comment/delete/"//{commentId}
export const COLLECTION_COMMENTS_VOTE = "collection/comment/vote/"//{commentId}/{vote}
export const COLLECTION_COMMENTS_VOTES = "collection/comment/votes/"//{commentId}/{page}
export const COLLECTION_COMMENTS_PROFILE = "collection/comment/all/profile/"//{p_id}/{page}

export const COLLECTION_FAVORITE_ADD = "collectionFavorite/add/"//{id}
export const COLLECTION_FAVORITE_DELETE = "collectionFavorite/delete/"//{id}
export const COLLECTION_FAVORITE = "collectionFavorite/all/"//{page}

export const COLLECTION_MY = "collectionMy/"//{id}/releases
export const COLLECTION_MY_DELETE = "collectionMy/delete/"//{collectionId}
export const COLLECTION_MY_ADD_RELEASE = "collectionMy/release/add/"//{collectionId}

// POST
export const COLLECTION_REPORT = "collection/report/"//{id}

export const COLLECTION_COMMENTS_ADD = "collection/comment/add/"//{collectionId}
export const COLLECTION_COMMENTS_EDIT = "collection/comment/edit/"//{commentId}
export const COLLECTION_COMMENTS_PROCESS =
  "collection/comment/process/"//{commentId}
export const COLLECTION_COMMENTS_REPLIES =
  "collection/comment/replies/"//{commentId}/{page}
export const COLLECTION_COMMENTS_REPORT =
  "collection/comment/report/"//{commentId}

export const COLLECTION_MY_CREATE = "collectionMy/create"
export const COLLECTION_MY_EDIT = "collectionMy/edit/"//{collectionId}
export const COLLECTION_MY_EDIT_IMAGE = "collectionMy/editImage/"//{collectionId}

// Config API

// GET
export const CONFIG_TOGGLES = "config/toggles"
export const CONFIG_URLS = "config/urls"

// DirectLink API

// POST
export const VIDEO_PARSE = "video/parse"

// Discover API

// POST
export const DISCOVER_COMMENTS = "discover/comments"
export const DISCOVER_DISCUSSING = "discover/discussing"
export const DISCOVER_INTERESTING = "discover/interesting"
export const DISCOVER_RECOMMENDATIONS = "discover/recommendations/"//{page}
export const DISCOVER_WATCHING = "discover/watching/"//{page}

// Episode API

// GET
export const EPISODE_TYPES = "episode/"//{releaseId}
export const EPISODE_SOURCES = "episode/"//{releaseId}/{typeId}
export const EPISODES = "episode/"//{releaseId}/{typeId}/{sourceId}
export const EPISODE_TARGET = "episode/target/"//{releaseId}/{sourceId}/{position}
export const EPISODE_UPDATES = "episode/updates/"//{releaseId}/{page}

// POST
export const EPISODE_WATCH_POSITION = "episode/watch/"//{releaseId}/{sourceId}/{position}
export const EPISODE_WATCH_SOURCE = "episode/watch/"//{releaseId}/{sourceId}
export const EPISODE_UNWATCH_POSITION = "episode/unwatch/"//{releaseId}/{sourceId}/{position}
export const EPISODE_UNWATCH_SOURCE = "episode/unwatch/"//{releaseId}/{sourceId}
export const EPISODE_REPORT = "episode/report/"//{releaseId}/{sourceId}/{position}

// Import API

// POST
export const IMPORT_BOOKMARKS = "import/bookmarks"
export const IMPORT_STATUS = "import/status"

// Export API

// POST
export const EXPORT_BOOKMARKS = "export/bookmarks"

// Favorite API

// GET
export const FAVORITES = "favorite/all/"//{page}
export const FAVORITE_ADD = "favorite/add/"//{r_id}
export const FAVORITE_DELETE = "favorite/delete/"//{r_id}

// History API

// GET
export const HISTORY = "history/"//{page}
export const HISTORY_ADD = "history/add/"//{r_id}/{s_id}/{position}
export const HISTORY_DELETE = "history/delete/"//{r_id}

// Profile API

// GET
export const PROFILE = "profile/"//{id}
export const PROFILE_INFO = "profile/info"
export const PROFILE_NICKNAMES_HISTORY = "profile/login/history/all/"//{id}/{page}
export const PROFILE_SOCIAL = "profile/social/"//{id}

// POST
export const PROFILE_PROCESS = "profile/process/"//{id}

// List API

// GET
export const LISTS = "profile/list/all/"//{p_id}/{status}/{page}
export const LISTS_MY = "profile/list/all/"//{status}/{page}
export const LISTS_ADD = "profile/list/add/"//{status}/{r_id}
export const LISTS_DELETE = "profile/list/delete/"//{status}/{r_id}

// Friends API

// GET
export const FRIENDS = "profile/friend/all/"//{id}/{page}
export const FRIENDS_REQUESTS_IN = "profile/friend/requests/in/"//{page}
export const FRIENDS_REQUESTS_OUT = "profile/friend/requests/out/"//{page}
export const FRIENDS_REQUESTS_IN_LAST = "profile/friend/requests/in/last"
export const FRIENDS_REQUESTS_OUT_LAST = "profile/friend/requests/out/last"
export const FRIENDS_REQUESTS_HIDE = "profile/friend/request/hide/"//{id}
export const FRIENDS_RECOMMENDATIONS = "profile/friend/recommendations"
export const FRIENDS_SEND = "profile/friend/request/send/"//{id}
export const FRIENDS_REMOVE = "profile/friend/request/remove/"//{id}

// Profile Preference API

// GET
export const PROFILE_PREFERENCE_MY = "profile/preference/my"
export const PROFILE_PREFERENCE_SOCIAL = "profile/preference/social"
export const PROFILE_PREFERENCE_CHANGE_EMAIL = "profile/preference/email/change"
export const PROFILE_PREFERENCE_CHANGE_EMAIL_CONFIRM = "profile/preference/email/change/confirm"
export const PROFILE_PREFERENCE_CHANGE_PASSWORD = "profile/preference/password/change"
export const PROFILE_PREFERENCE_STATUS_DELETE = "profile/preference/status/delete"

// POST
export const PROFILE_PREFERENCE_AVATAR_EDIT = "profile/preference/avatar/edit"
export const PROFILE_PREFERENCE_STATUS_EDIT = "profile/preference/status/edit"
export const PROFILE_PREFERENCE_SOCIAL_EDIT = "profile/preference/social/edit"
export const PROFILE_PREFERENCE_CHANGE_LOGIN = "profile/preference/login/change"
export const PROFILE_PREFERENCE_CHANGE_LOGIN_INFO = "profile/preference/login/info"
export const PROFILE_PREFERENCE_GOOGLE_BIND = "profile/preference/google/bind"
export const PROFILE_PREFERENCE_GOOGLE_UNBIND = "profile/preference/google/unbind"
export const PROFILE_PREFERENCE_VK_BIND = "profile/preference/vk/bind"
export const PROFILE_PREFERENCE_VK_UNBIND = "profile/preference/vk/unbind"
export const PROFILE_PREFERENCE_PRIVACY_COUNTS_EDIT = "profile/preference/privacy/counts/edit"
export const PROFILE_PREFERENCE_PRIVACY_FRIEND_REQUESTS_EDIT = "profile/preference/privacy/friendRequests/edit"
export const PROFILE_PREFERENCE_PRIVACY_SOCIAL_EDIT = "profile/preference/privacy/social/edit"
export const PROFILE_PREFERENCE_PRIVACY_STATS_EDIT = "profile/preference/privacy/stats/edit"
export const PROFILE_PREFERENCE_SECTION_EDIT = "profile/preference/section/edit"
export const PROFILE_PREFERENCE_THEMES_EDIT = "profile/preference/themes/edit"

// Profile Badge API
export const PROFILE_BADGE_ALL = "profile/preference/badge/all/"//{page}
export const PROFILE_BADGE_EDIT = "profile/preference/badge/edit/"//{id}
export const PROFILE_BADGE_REMOVE = "profile/preference/badge/remove"

// Profile BlockList API
export const PROFILE_BLACKLIST = "profile/blocklist/all/"//{page}
export const PROFILE_BLACKLIST_ADD = "profile/blocklist/add/"//{id}
export const PROFILE_BLACKLIST_REMOVE = "profile/blocklist/remove/"//{id}

// Notification Preference API
export const NOTIFICATION_PREFERENCE_MY = "profile/preference/notification/my"
export const NOTIFICATION_PREFERENCE_ARTICLE_EDIT = "profile/preference/notification/article/edit"
export const NOTIFICATION_PREFERENCE_COMMENT_EDIT = "profile/preference/notification/comment/edit"
export const NOTIFICATION_PREFERENCE_EPISODE_EDIT = "profile/preference/notification/episode/edit"
export const NOTIFICATION_PREFERENCE_EPISODE_FIRST_EDIT = "profile/preference/notification/episode/first/edit"
export const NOTIFICATION_PREFERENCE_MY_ARTICLE_COMMENT_EDIT = "profile/preference/notification/my/article/comment/edit"
export const NOTIFICATION_PREFERENCE_MY_COLLECTION_COMMENT_EDIT = "profile/preference/notification/my/collection/comment/edit"
export const NOTIFICATION_PREFERENCE_RELEASE_ALL = "profile/preference/notification/release/all/"//{page}
export const NOTIFICATION_PREFERENCE_RELEASE_TYPE = "profile/preference/notification/release/type/"//{releaseId}
export const NOTIFICATION_PREFERENCE_RELEASE_TYPE_EDIT = "profile/preference/notification/release/type/edit"
export const NOTIFICATION_PREFERENCE_STATUS_EDIT = "profile/preference/notification/status/edit"
export const NOTIFICATION_PREFERENCE_TYPE_EDIT = "profile/preference/notification/type/edit"
export const NOTIFICATION_PREFERENCE_RELATED_RELEASE_EDIT = "profile/preference/notification/related/release/edit"
export const NOTIFICATION_PREFERENCE_REPORT_PROCESS_EDIT = "profile/preference/notification/report/process/edit"
export const NOTIFICATION_PREFERENCE_SELECTED_RELEASES_EDIT = "profile/preference/notification/selected/releases/edit"

// Vote API

// GET
export const VOTE_VOTED = "profile/vote/release/voted/"//{p_id}/{page}
export const VOTE_UNVOTED = "profile/vote/release/unvoted/"//{page}
export const VOTE_UNVOTED_LAST = "profile/vote/release/unvoted/last"

// Related API

// GET
export const RELATED = "related/"//{relatedId}/{page}

// Release API

// GET
export const RELEASE = "release/"//{r_id}

export const RELEASE_RANDOM = "release/random"
export const RELEASE_RANDOM_FAVORITE = "release/random/favorite"
export const RELEASE_RANDOM_PROFILE = "release/random/profile/list/"//{p_id}/{status}
export const RELEASE_RANDOM_COLLECTION = "release/collection/"//{id}/random

export const RELEASE_VOTE_ADD = "release/vote/add/"//{r_id}/{vote}
export const RELEASE_VOTE_DELETE = "release/vote/delete/"//{r_id}

export const RELEASE_COMMENT = "release/comment/"//{releaseId}
export const RELEASE_COMMENTS_PAGE = "release/comment/all/"//{releaseId}/{page}
export const RELEASE_COMMENT_DELETE = "release/comment/delete/"//{commentId}
export const RELEASE_COMMENT_VOTE = "release/comment/vote/"//{commentId}/{vote}
export const RELEASE_COMMENT_VOTES = "release/comment/votes/"//{commentId}/{page}
export const RELEASE_COMMENT_REPLIES = "release/comment/replies/"//{commentId}/{page}
export const RELEASE_COMMENT_PROFILE = "release/comment/all/profile/"//{p_id}/{page}

export const RELEASE_STREAMING_PLATFORM = "release/streaming/platform/"//{releaseId}

// Release Video API
export const RELEASE_VIDEO = "video/release/"//{releaseId}
export const RELEASE_VIDEO_PAGE = "video/release/"//{releaseId}/{page}
export const RELEASE_VIDEO_PROFILE = "video/profile/"//{p_id}/{page}
export const RELEASE_VIDEO_CATEGORIES = "video/release/categories"
export const RELEASE_VIDEO_CATEGORY = "video/release/"//{releaseId}/category/{categoryId}/{page}

// Release Video Appeal API
export const VIDEO_APPEAL_ADD = "video/appeal/add"
export const VIDEO_APPEAL_DELETE = "video/appeal/delete/"//{appealId}
export const VIDEO_APPEAL_PROFILE = "video/appeal/profile/"//{page}
export const VIDEO_APPEAL_PROFILE_LAST = "video/appeal/profile/last"

// Release Video Favorite API
export const RELEASE_FAVORITE_VIDEOS = "releaseVideoFavorite/all/"//{p_id}/{page}
export const RELEASE_FAVORITE_VIDEO_ADD = "releaseVideoFavorite/add/"//{r_id}
export const RELEASE_FAVORITE_VIDEO_DELETE = "releaseVideoFavorite/delete/"//{r_id}

// POST
export const RELEASE_FILTER = "filter/"//{page}

export const RELEASE_COMMENT_ADD = "release/comment/add/"//{releaseId}
export const RELEASE_COMMENT_EDIT = "release/comment/edit/"//{commentId}
export const RELEASE_COMMENT_PROCESS = "release/comment/process/"//{commentId}

export const RELEASE_REPORT = "release/report/"//{r_id}
export const RELEASE_COMMENT_REPORT = "release/comment/report/"//{commentId}

// Report API

// GET
export const REPORT_RELEASE_REASONS = "report/release/reasons"
export const REPORT_RELEASE_COMMENTS_REASONS = "report/comment/release/reasons"
export const REPORT_COLLECTION_REASONS = "report/collection/reasons"
export const REPORT_COLLECTION_COMMENT_REASONS = "report/comment/collection/reasons"
export const REPORT_EPISODE_REASONS = "report/episode/reasons"
export const REPORT_PROFILE_REASONS = "report/profile/reasons"
export const REPORT_CHANNEL_REASONS = "report/channel/reasons"
export const REPORT_ARTICLE_REASONS = "report/article/reasons"
export const REPORT_ARTICLE_COMMENT_REASONS = "report/comment/article/reasons"

// POST
export const REPORT_RELEASE = "report/release"
export const REPORT_RELEASE_COMMENT = "report/comment/release"
export const REPORT_COLLECTION = "report/collection"
export const REPORT_COLLECTION_COMMENT = "report/comment/collection"
export const REPORT_EPISODE = "report/episode"
export const REPORT_PROFILE = "report/profile"
export const REPORT_CHANNEL = "report/channel"
export const REPORT_ARTICLE = "report/article"
export const REPORT_ARTICLE_COMMENT = "report/comment/article"

// Schedule API

// GET
export const SCHEDULE = "schedule"

// Search API

// POST
export const SEARCH_PROFILE = "search/profiles/"//{page}
export const SEARCH_RELEASE = "search/releases/"//{page}
export const SEARCH_COLLECTION = "search/collections/"//{page}
export const SEARCH_FAVORITE_COLLECTION = "search/favoriteCollections/"//{page}
export const SEARCH_PROFILE_COLLECTION = "search/profileCollections/"//{p_id}/{page}
export const SEARCH_PROFILE_LIST = "search/profile/list/"//{status}/{page}
export const SEARCH_FAVORITE = "search/favorites/"//{page}
export const SEARCH_HISTORY = "search/history/"//{page}
export const SEARCH_FEED = "search/feed/"//{page}
export const SEARCH_CHANNEL = "search/channels/"//{page}
export const SEARCH_CHANNEL_SUBSCRIBERS = "search/channel/"//{c_id}/subscribers/{page}
export const SEARCH_ARTICLE = "search/articles/"//{page}

// Notification API

// GET
export const NOTIFICATION_ALL = "notification/all/"//{page}
export const NOTIFICATION_COUNT = "notification/count"
export const NOTIFICATION_DELETE_ALL = "notification/delete/all"
export const NOTIFICATION_READ = "notification/read"
export const NOTIFICATION_ARTICLE_COMMENTS = "notification/article/comments/"//{page}
export const NOTIFICATION_ARTICLES = "notification/articles/"//{page}
export const NOTIFICATION_COLLECTION_COMMENTS = "notification/collectionComments/"//{page}
export const NOTIFICATION_EPISODES = "notification/episodes/"//{page}
export const NOTIFICATION_FRIENDS = "notification/friends/"//{page}
export const NOTIFICATION_MY_ARTICLE_COMMENTS = "notification/my/article/comments/"//{page}
export const NOTIFICATION_MY_COLLECTION_COMMENTS = "notification/my/collection/comments/"//{page}
export const NOTIFICATION_RELATED_RELEASE = "notification/related/release/"//{page}
export const NOTIFICATION_RELEASE_COMMENTS = "notification/releaseComments/"//{page}
export const NOTIFICATION_ARTICLE_COMMENT_DELETE = "notification/article/comment/delete/"//{id}
export const NOTIFICATION_COLLECTION_COMMENT_DELETE = "notification/collectionComment/delete/"//{id}
export const NOTIFICATION_EPISODE_DELETE = "notification/episode/delete/"//{id}
export const NOTIFICATION_FRIEND_DELETE = "notification/friend/delete/"//{id}
export const NOTIFICATION_MY_ARTICLE_COMMENT_DELETE = "notification/my/article/comment/delete/"//{id}
export const NOTIFICATION_MY_COLLECTION_COMMENT_DELETE = "notification/my/collection/comment/delete/"//{id}
export const NOTIFICATION_RELATED_RELEASE_DELETE = "notification/related/release/delete/"//{id}
export const NOTIFICATION_RELEASE_COMMENT_DELETE = "notification/releaseComment/delete/"//{id}

// Profile Role List API
export const PROFILE_ROLE_LIST_ALL = "profile/role/list/all/"//{page}
