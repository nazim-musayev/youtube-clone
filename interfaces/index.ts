export interface Nav {
  d: string,
  d2?: string,
  label: string,
  badgeContent?: number
};

export interface VideoCard {
  publishedAt: string,
  title: string,
  channelTitle: string,
  channelId: string,
  viewCount: string,
  duration: string,
  thumbnail: string,
  videoId: string,
  avatarUrl?: string,
  description?: string,
  likes?: string
};

export interface Category {
  id: number,
  title: string,
};

export interface Tag {
  tag: string,
  id: string
};

export interface ChannelData {
  avatarUrl: string,
  subscribers?: string,
  id?: string
};

export interface Comment {
  text: string,
  name: string,
  avatarUrl: string,
  likes: number,
  publishedAt: string
};

export interface ArrowHandle {
  down: (inputIsFocused: boolean) => void,
  up: (inputIsFocused: boolean) => void
};

export type SingleVideo = Omit<VideoCard, "duration" | "thumbnail" | "avatarUrl">;
export type VideoWithoutStatistics = Omit<VideoCard, "viewCount" | "duration" | "avatarUrl">;
export type VideoWithStatistics = Pick<VideoCard, "viewCount" | "duration" | "videoId">;
export type Subscription = Pick<VideoCard, "title" | "channelId" | "avatarUrl">;