import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbum } from './albumSlice';
import GridItem from '../../components/mainPage/GridItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Content from '../content/Content';
import GoBackButton from '../../components/GoBackButton';

function Album() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { albumTag } = useParams();
  const { postIds, postThumbnailById } = useAppSelector((state) => state.album);
  const [contentOpen, setContentOpen] = useState({ isOpen: false, postId: 0 });

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { usr: albumId } = history.state;
    if (!albumId) return;
    dispatch(fetchAlbum(albumId));
  }, []);

  function handleOpenContent(postId: number) {
    setContentOpen({ isOpen: true, postId });
  }

  function handleCloseContent() {
    setContentOpen({ isOpen: false, postId: 0 });
  }

  function handleClickShareLink() {
    // copy link
    // and popup message
  }

  return (
    <>
      {contentOpen.isOpen ? <Content postId={contentOpen.postId} handleClose={handleCloseContent} /> : null}
      <GoBackButton />
      <ButtonsContainer>
        <ButtonContainer>
          <Button variant="outlined" color="info">
            share link
          </Button>
        </ButtonContainer>
        <ButtonContainer onClick={() => navigate(`/main/albums/${albumTag}/upload`)}>
          <Button variant="contained">add new post</Button>
        </ButtonContainer>
      </ButtonsContainer>

      <PostsContainer>
        {postIds.map((postId) => (
          <GridItem
            postId={postId}
            handleOpenContent={handleOpenContent}
            thumbnailUrl={postThumbnailById[postId].thumbnailUrl}
          />
        ))}
      </PostsContainer>
    </>
  );
}

export default Album;

const ButtonsContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-left: 0.5rem;
`;

const PostsContainer = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
