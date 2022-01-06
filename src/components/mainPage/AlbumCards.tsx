import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbumList } from '../../features/albumList/albumListSlice';

export default function AlbumCards() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { albumIds, albumInfoById, status } = useAppSelector((state) => state.albumList);

  useEffect(() => {
    dispatch(fetchAlbumList());
  }, []);

  function handleAlbumClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    navigate(`/main/albums/${e.currentTarget.id}`);
  }

  return (
    <>
      {albumIds.map((id) => (
        <AlbumCard id={albumInfoById[id].albumTag} onClick={handleAlbumClick}>
          <AlbumThumbnailImg src={albumInfoById[id].thumbnailUrl} />
          <AlbumInfo>
            <AlbumTitle>{albumInfoById[id].albumName}</AlbumTitle>
            <AlbumTitle>{`(${albumInfoById[id].count})`}</AlbumTitle>
          </AlbumInfo>
        </AlbumCard>
      ))}
    </>
  );
}

const AlbumCard = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  border: solid 1px #c0c0c0;
  border-radius: 1rem;
  background-color: #f0f0f0;
  transition: all 250ms ease-in;

  cursor: pointer;
  :hover {
    opacity: 0.8;
    transform: scale(1.01);
  }
`;

const AlbumThumbnailImg = styled.img`
  width: 100%;
  height: 12rem;
  border-radius: 1rem;
  object-fit: cover;
`;

const AlbumInfo = styled.div`
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(73, 73, 73, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlbumTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-right: 0.5rem;
`;
