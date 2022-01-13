import albumAPI from '../../apis/albumAPI';

export type AlbumInfo = {
  albumId: number;
  albumTag: string;
  albumName: string | null;
  thumbnailUrl: string;
  count: number;
};

export type AlbumInfos = {
  [albumId: number]: AlbumInfo;
};
