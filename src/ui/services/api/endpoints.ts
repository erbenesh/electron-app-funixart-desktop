
// API URLs
export const BASE_URL = "https://api.anixart.tv/"
export const ALT_URL = "https://api-s2.anixart.tv/"

export const USER_AGENT = "AnixartApp/8.2.1-23121216 (Android 9; SDK 28; arm64-v8a; samsung SM-G975N; en)"

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

// Article API

// GET
export const ARTICLE = "article/"//{a_id}
export const ARTICLE_CREATE_AVAILABLE = "article/create/"//{c_id}/available
export const ARTICLE_EDIT_AVAILABLE = "article/create/"//{c_id}/available
export const ARTICLE_VOTE = "article/create/"//{a_id}/{vote}

// POST
export const ARTICLE_ALL = "article/all/"//{page}
export const ARTICLE_CREATE = "article/create/"//{c_id}
export const ARTICLE_DELETE = "article/delete/"//{a_id}
export const ARTICLE_EDIT = "article/edit/"//{a_id}
export const ARTICLE_VOTES = "article/votes/"//{a_id}/{page}

// Article Comment API

//GET
export const ARTICLE_COMMENT = "article/comment/"//{articleId}
export const ARTICLE_COMMENT_ALL = "article/comment/all"//{a_id}/{page}
export const ARTICLE_COMMENT_ALL_POPULAR = "article/comment/all"//{a_id}/popular
export const ARTICLE_COMMENT_DELETE = "article/comment/delete/"//{commentId}
export const ARTICLE_COMMENT_ALL_PROFILE = "article/comment/all/profile/"//{p_id}/{page}
export const ARTICLE_COMMENT_VOTE = "article/comment/vote/"//{commentId}/{vote}

//POST
export const ARTICLE_COMMENT_ADD = "article/comment/add/"//{commentId}
export const ARTICLE_COMMENT_EDIT = "article/comment/edit/"//{commentId}
export const ARTICLE_COMMENT_PROCESS = "article/comment/process/"//{commentId}
export const ARTICLE_COMMENT_REPLIES = "article/comment/replies/"//{commentId}/{page}
export const ARTICLE_COMMENT_REPORT = "article/comment/report/"//{commentId}
export const ARTICLE_COMMENT_VOTES = "article/comment/votes/"//{commentId}/{page}


// Collection API

// GET
export const COLLECTION = "collection/"//{id}
export const COLLECTION_PROFILE = "collection/all/profile/"//{profileId}/{page}
export const COLLECTION_RELEASES = "collection/"//{id}/releases/{page}
export const COLLECTION_RELEASE = "collection/all/release/"//{releaseId}/{page}
export const COLLECTION_LIST = "collection/all/"//{page}

export const COLLECTION_COMMENTS = "collection/comment/all/"//{id}/{page}
export const COLLECTION_COMMENTS_DELETE = "collection/comment/delete/"//{id}
export const COLLECTION_COMMENTS_VOTE = "collection/comment/vote/"//{id}/{mark}
export const COLLECTION_COMMENTS_VOTES = "collection/comment/votes/"//{commentId}/{page}

export const COLLECTION_FAVORITE_ADD = "collectionFavorite/add/"//{id}
export const COLLECTION_FAVORITE_DELETE = "collectionFavorite/delete/"//{id}
export const COLLECTION_FAVORITE = "collectionFavorite/all/"//{page}

export const COLLECTION_MY = "collectionMy/"//{id}/releases
export const COLLECTION_MY_DELETE = "collectionMy/delete/"//{id}
export const COLLECTION_MY_ADD_RELEASE = "collectionMy/release/add/"//{id}

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

export const EPISODE = "episode/"

export const EPISODE_TYPES = "episode/"//{releaseId}
export const EPISODE_SOURCES = "episode/"//{releaseId}/{typeId}
export const EPISODES = "episode/"//{releaseId}/{typeId}/{sourceId}
export const EPISODE_TARGET = "episode/target/"//{releaseId}/{sourceId}/{position}
export const EPISODE_UPDATES = "episode/updates/"//{releaseId}/{page}

// POST
export const EPISODE_WATCH_POSITION =
  "episode/watch/{releaseId}/{sourceId}/{position}"
export const EPISODE_WATCH_SOURCE = "episode/watch/"//{releaseId}/{sourceId}
export const EPISODE_UNWATCH_POSITION =
  "episode/unwatch/{releaseId}/{sourceId}/{position}"
export const EPISODE_UNWATCH_SOURCE = "episode/unwatch/{releaseId}/{sourceId}"
export const EPISODE_REPORT = "episode/report/{releaseId}/{sourceId}/{position}"

// Import API

// POST
export const IMPORT_BOOKMARKS = "import/bookmarks"
export const IMPORT_STATUS = "import/status"

// Export API

// POST
export const EXPORT_BOOKMARKS = "export/bookmarks"

// Favorite API

// GET
export const FAVORITES = "favorite/all/{page}"
export const FAVORITE_ADD = "favorite/add/"
export const FAVORITE_DELETE = "favorite/delete/"

// History API

// GET
export const HISTORY = "history/{page}"
export const HISTORY_ADD = "history/add/"//{releaseId}/{sourceId}/{position}
export const HISTORY_DELETE = "history/delete/{releaseId}"

// Profile API

// GET
export const PROFILE = "profile/"
export const PROFILE_LOGIN = "profile/login"
export const PROFILE_NICKNAMES_HISTORY = "profile/login/history/all/{id}/{page}"
export const PROFILE_SOCIAL = "profile/social/{id}"

export const PROFILE_BLACKLIST = "profile/blocklist/all/{page}"
export const PROFILE_BLACKLIST_ADD = "profile/blocklist/add/{id}"
export const PROFILE_BLACKLIST_REMOVE = "profile/blocklist/remove/{id}"

// POST
export const PROFILE_PROCESS = "profile/process/{id}"

// List API

// GET
export const LISTS = "profile/list/all/"//{profileId}/{status}/{page}
export const LISTS_ADD = "profile/list/add/"//{status}/{releaseId}
export const LISTS_DELETE = "profile/list/delete/"//{status}/{releaseId}

// Friends API

// GET
export const FRIENDS = "profile/friend/all/{id}/{page}"
export const FRIENDS_REQUESTS_IN = "profile/friend/requests/in/{page}"
export const FRIENDS_REQUESTS_OUT = "profile/friend/requests/out/{page}"
export const FRIENDS_REQUESTS_IN_LAST = "profile/friend/requests/in/last"
export const FRIENDS_REQUESTS_OUT_LAST = "profile/friend/requests/out/last"
export const FRIENDS_REQUESTS_HIDE = "profile/friend/requests/hide/{id}"
export const FRIENDS_RECOMMENDATIONS = "profile/friend/recommendations"
export const FRIENDS_SEND = "profile/friend/request/send/{id}"
export const FRIENDS_REMOVE = "profile/friend/request/remove/{id}"

// Settings API

// GET
export const SETTINGS_PROFILE = "profile/preference/my"
export const SETTINGS_PROFILE_CHANGE_EMAIL = "profile/preference/email/change"
export const SETTINGS_PROFILE_CHANGE_EMAIL_CONFIRM =
  "profile/preference/email/change/confirm"
export const SETTINGS_PROFILE_STATUS_DELETE = "profile/preference/status/delete"
export const SETTINGS_PROFILE_CHANGE_PASSWORD =
  "profile/preference/password/change"

export const SETTINGS_NOTIFICATION = "profile/preference/notification/my"
export const SETTINGS_NOTIFICATION_RELEASE =
  "profile/preference/notification/episode/edit"
export const SETTINGS_NOTIFICATION_FIRST_RELEASE =
  "profile/preference/notification/episode/first/edit"
export const SETTINGS_NOTIFICATION_COMMENTS =
  "profile/preference/notification/comment/edit"
export const SETTINGS_NOTIFICATION_COLLECTION =
  "profile/preference/notification/my/collection/comment/edit"

// POST
export const EDIT_STATUS = "profile/preference/status/edit"
export const EDIT_SOCIAL = "profile/preference/social/edit"
export const EDIT_AVATAR = "profile/preference/avatar/edit"

export const SETTINGS_NOTIFICATION_RELEASE_LIST =
  "/profile/preference/notification/status/edit"
export const SETTINGS_NOTIFICATION_RELEASE_TYPE =
  "/profile/preference/notification/type/edit"

export const SETTINGS_PROFILE_CHANGE_LOGIN = "profile/preference/login/change"
export const SETTINGS_PROFILE_CHANGE_LOGIN_INFO =
  "profile/preference/login/info"

export const SETTINGS_PROFILE_BIND_GOOGLE = "profile/preference/google/bind"
export const SETTINGS_PROFILE_UNBIND_GOOGLE = "profile/preference/google/unbind"
export const SETTINGS_PROFILE_BIND_VK = "profile/preference/vk/bind"
export const SETTINGS_PROFILE_UNBIND_VK = "profile/preference/vk/unbind"

export const SETTINGS_PROFILE_PRIVACY_COUNTS =
  "profile/preference/privacy/counts/edit"
export const SETTINGS_PROFILE_PRIVACY_FRIENDS_REQUESTS =
  "profile/preference/privacy/friendRequests/edit"
export const SETTINGS_PROFILE_PRIVACY_SOCIAL =
  "profile/preference/privacy/social/edit"
export const SETTINGS_PROFILE_PRIVACY_STATS =
  "profile/preference/privacy/stats/edit"

// Vote API

// GET
export const VOTE_VOTED = "profile/vote/release/voted/{profileId}/{page}"
export const VOTE_UNVOTED = "profile/vote/release/unvoted/{page}"
export const VOTE_UNVOTED_LAST = "profile/vote/release/unvoted/{page}/last"

// Related API

// GET
export const RELATED = "related/{relatedId}/{page}"

// Release API

// GET
export const RELEASE = "release/"

export const RELEASE_RANDOM = "release/random"
export const RELEASE_RANDOM_FAVORITE = "release/random/favorite"
export const RELEASE_RANDOM_PROFILE =
  "release/random/profile/list/{profileId}/{status}"
export const RELEASE_RANDOM_COLLECTION = "release/collection/{id}/random"

export const RELEASE_VOTE_ADD = "release/vote/add/{releaseId}/{vote}"
export const RELEASE_VOTE_DELETE = "release/vote/delete/{releaseId}"

export const RELEASE_COMMENTS = "release/comment/"//{releaseId}
export const RELEASE_COMMENTS_PAGE = "release/comment/all/"//{releaseId}/{page}
export const RELEASE_COMMENT_DELETE = "release/comment/delete/"//{commentId}
export const RELEASE_COMMENT_VOTE = "release/comment/vote/"//{commentId}/{vote}
export const RELEASE_COMMENT_REPLIES =
  "release/comment/replies/"//{commentId}/{page}
export const RELEASE_COMMENT_PROFILE =
  "release/comment/all/profile/"//{profileId}/{page}

export const RELEASE_STREAMING_PLATFORM =
  "release/streaming/platform/"//{releaseId}

export const RELEASE_VIDEO = "video/release/{releaseId}"
export const RELEASE_VIDEO_APPEAL = "video/release/{releaseId}/appeal"
export const RELEASE_VIDEO_PAGE = "video/release/{releaseId}/{page}"
export const RELEASE_VIDEO_PROFILE = "video/profile/{profileId}/{page}"
export const RELEASE_VIDEO_CATEGORIES = "video/release/categories"
export const RELEASE_VIDEO_CATEGORY =
  "video/release/{releaseId}/category/{categoryId}/{page}"

export const VIDEO_APPEAL_ADD = "video/appeal/add"
export const VIDEO_APPEAL_DELETE = "video/appeal/delete/{appealId}"
export const VIDEO_APPEAL_PROFILE = "video/appeal/profile/{page}"
export const VIDEO_APPEAL_PROFILE_LAST = "video/appeal/profile/last"

export const RELEASE_FAVORITE_VIDEOS =
  "releaseVideoFavorite/all/{profileId}/{page}"
export const RELEASE_FAVORITE_VIDEO_ADD = "releaseVideoFavorite/add/{releaseId}"
export const RELEASE_FAVORITE_VIDEO_DELETE =
  "releaseVideoFavorite/delete/{releaseId}"

// POST
export const RELEASE_FILTER = "filter/"

export const RELEASE_COMMENT_ADD = "release/comment/add/{releaseId}"
export const RELEASE_COMMENT_EDIT = "release/comment/edit/{commentId}"
export const RELEASE_COMMENT_PROCESS = "release/comment/process/{commentId}"

export const RELEASE_REPORT = "release/report/{releaseId}"
export const RELEASE_COMMENT_REPORT = "release/comment/report/{commentId}"

// Report API

// GET
export const REPORT_RELEASE_REASONS = "report/release/reasons"
export const REPORT_RELEASE_COMMENTS_REASONS = "report/comment/release/reasons"
export const REPORT_COLLECTION_REASONS = "report/collection/reasons"
export const REPORT_COLLECTION_COMMENT_REASONS =
  "report/comment/collection/reasons"
export const REPORT_EPISODE_REASONS = "report/episode/reasons"
export const REPORT_PROFILE_REASONS = "report/profile/reasons"

// POST
export const REPORT_RELEASE = "report/release"
export const REPORT_RELEASE_COMMENT = "report/comment/release"
export const REPORT_COLLECTION = "report/collection"
export const REPORT_COLLECTION_COMMENT = "report/comment/collection"
export const REPORT_EPISODE = "report/episode"
export const REPORT_PROFILE = "report/profile"

// Schedule API

// GET
export const SCHEDULE = "schedule"

// Search API

// POST
export const SEARCH_PROFILE = "search/profiles/"//{page}
export const SEARCH_RELEASE = "search/releases/"//{page}
export const SEARCH_COLLECTION = "search/collections/"//{page}
export const SEARCH_FAVORITE_COLLECTION = "search/favoriteCollections/"//{page}
export const SEARCH_PROFILE_COLLECTION = "search/profileCollections/{profileId}/"//{page}
export const SEARCH_PROFILE_LIST = "search/profile/list/"//{status}/{page}
export const SEARCH_FAVORITE = "search/favorites/"//{page}
export const SEARCH_HISTORY = "search/history/"//{page}

// Type API

// GET
export const TYPES = "type/{releaseId}"
