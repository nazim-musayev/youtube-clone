export interface Nav {
  d: string,
  d2?: string,
  label: string,
  badgeContent?: number
};

export interface SingleVideo {
  publishedAt: string,
  title: string,
  description: string,
  channelTitle: string,
  channelId: string,
  viewCount: string,
  videoId: string,
  likes: string,
  dislikes: string
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
  description?: string
};

export interface VideoWithoutStatistics {
  publishedAt: string,
  title: string,
  channelTitle: string,
  channelId: string,
  thumbnail: string,
  videoId: string,
  description?: string
};

export interface VideoWithStatistics {
  viewCount: string,
  duration: string,
  id: string
};

export interface Subscription {
  title: string,
  channelId: string,
  avatarUrl: string
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
