export interface IRelated {
  id: number;
  name: string;
  description: string;
  image: string;
  images: string[] | null;
  name_ru: string;
  release_count: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IStatus {
  id: number;
  name: string;
}

export interface ICommentProfile {
  id: number;
  login: string;
  avatar: string;
  ban_expires: number;
  ban_reason: string | number | boolean | null;
  privilege_level: number;
  badge_id: string | number | boolean | null;
  badge_name: string | number | boolean | null;
  badge_type: string | number | boolean | null;
  badge_url: string | number | boolean | null;
  is_banned: boolean;
  is_sponsor: boolean;
  is_verified: boolean;
}

export interface IComment {
  id: number;
  profile: ICommentProfile;
  message: string;
  timestamp: number;
  type: number;
  vote: number;
  release: IRelease;
  parent_comment_id: number | null;
  vote_count: number;
  likes_count: number;
  is_spoiler: boolean;
  is_edited: boolean;
  is_deleted: boolean;
  is_reply: boolean;
  reply_count: number;
  can_like: boolean;
}

export interface IEpisodeLastUpdate {
  last_episode_update_date: number;
  last_episode_update_name: string;
  last_episode_source_update_id: number;
  last_episode_source_update_name: number;
  last_episode_type_update_id: number;
  lastEpisodeTypeUpdateName: string;
}

export interface IBanner {
  name: string;
  image: string;
  value: string;
  action_id: number;
  is_new: boolean;
}

export interface IRelease {
  '@id': number;
  id: number;
  poster: string;
  image: string;
  year: string;
  genres: string;
  country: string;
  director: string;
  author: string;
  translators: string;
  studio: string;
  description: string;
  note: string;
  related: IRelated[];
  category: ICategory;
  rating: number;
  grade: number;
  status: IStatus;
  duration: number;
  season: number;
  broadcast: number;
  screenshots: string[];
  comments: IComment[];
  title_original: string;
  title_ru: string;
  title_alt: string;
  episodes_released: number;
  episodes_total: number;
  release_date: string;
  vote_1_count: number;
  vote_2_count: number;
  vote_3_count: number;
  vote_4_count: number;
  vote_5_count: number;
  vote_count: number;
  creation_date: number;
  last_update_date: number;
  aired_on_date: number;
  favorites_count: number;
  watching_count: number;
  plan_count: number;
  completed_count: number;
  hold_on_count: number;
  dropped_count: number;
  is_adult: boolean;
  is_play_disabled: boolean;
  is_tpp_disabled: boolean;
  can_video_appeal: boolean;
  can_torlook_search: boolean;
  is_deleted: boolean;
  age_rating: number;
  your_vote: number | string | null;
  related_count: number;
  comment_count: number;
  comments_count: number;
  collection_count: number;
  profile_list_status: number;
  status_id: number;
  last_view_timestamp: number;
  last_view_episode: number | string | null;
  is_viewed: boolean;
  is_favorite: boolean;
  is_view_blocked: boolean;
  screenshot_images: string[];
  related_releases: IRelease[];
  recommended_releases: IRelease[];
  episode_last_update: IEpisodeLastUpdate;
  comment_per_day_count: number;
  video_banners: IBanner[];
  profile_release_type_notification_preference_count: number;
  is_release_type_notifications_enabled: boolean;
}
