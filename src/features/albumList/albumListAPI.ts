export type AlbumInfos = {
  [albumId: number]: {
    albumId: number;
    albumTag: string;
    albumName: string;
    thumbnailUrl: string;
    count: number;
  };
};
