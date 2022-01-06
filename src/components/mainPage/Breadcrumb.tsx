import styled from 'styled-components';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';

export default function Breadcrumb() {
  const { albumName, albumTag } = useAppSelector((state) => state.album);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/main/albums">
        Albums
      </Link>
      {albumName === undefined ? (
        <Typography color="text.primary"></Typography>
      ) : (
        <Link underline="hover" color="inherit" href={`/main/albums/${albumTag}`}>
          {`${albumName}`}
        </Link>
      )}
    </Breadcrumbs>
  );
}
