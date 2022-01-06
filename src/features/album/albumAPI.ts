export interface PostThumbnails {
  [postId: string]: {
    postId: number;
    thumbnailUrl: string;
  };
}
