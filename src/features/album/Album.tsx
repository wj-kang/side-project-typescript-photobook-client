import styled from 'styled-components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbum } from './albumSlice';
import GridItem from '../../components/mainPage/GridItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

function Album() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postIds, postThumbnailById } = useAppSelector((state) => state.album);
  const { albumTag } = useParams();

  useEffect(() => {
    if (albumTag === undefined) return;
    dispatch(fetchAlbum(albumTag));
  }, [albumTag]);

  return (
    <>
      <ButtonsContainer>
        <ButtonContainer>
          <Button variant="text">Edit</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button variant="text" color="warning">
            delete
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button variant="outlined" color="info">
            share link
          </Button>
        </ButtonContainer>
        <ButtonContainer onClick={() => navigate(`/main/albums/${albumTag}/upload`)}>
          <Button variant="contained">add new photo</Button>
        </ButtonContainer>
      </ButtonsContainer>

      <PostsContainer>
        {postIds.map((postId) => (
          <GridItem thumbnailUrl={postThumbnailById[postId].thumbnailUrl} />
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
