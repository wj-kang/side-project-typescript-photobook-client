import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAlbum, setEditModeOff, toggleEditMode } from './albumSlice';
import styled from 'styled-components';
import { Button } from '@mui/material';
import GridItem from '../../components/mainPage/GridItem';
import Content from '../content/Content';
import GoBackButton from '../../components/GoBackButton';
import Spinner from '../../components/Spinner';

function Album() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { albumTag } = useParams();
  const { postIds, postThumbnailById, editModeOn, albumName, status } = useAppSelector((state) => state.album);
  const [contentOpen, setContentOpen] = useState({ isOpen: false, postId: 0 });

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (!albumTag) return;
    if (postIds.length < 1) dispatch(fetchAlbum(albumTag));
    if (editModeOn) dispatch(setEditModeOff());
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
      {status === 'failed' ? navigate('/main') : null}
      {contentOpen.isOpen ? <Content postId={contentOpen.postId} handleClose={handleCloseContent} /> : null}

      <Header>
        <Title>{albumName}</Title>
        <AbsoluteGoBackButton />
      </Header>
      <ButtonsContainer>
        <ButtonContainer>
          <Button
            variant={editModeOn ? 'contained' : 'outlined'}
            color={editModeOn ? 'warning' : 'info'}
            onClick={() => dispatch(toggleEditMode())}
          >
            {editModeOn ? 'Done' : 'Edit'}
          </Button>
        </ButtonContainer>
        {editModeOn ? null : (
          <>
            <ButtonContainer>
              <Button variant="outlined" color="info">
                share link
              </Button>
            </ButtonContainer>
            <ButtonContainer onClick={() => navigate(`/main/${albumTag}/upload`)}>
              <Button variant="contained">add new post</Button>
            </ButtonContainer>
          </>
        )}
      </ButtonsContainer>
      {status === 'loading' ? (
        <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" />
      ) : postIds.length === 0 ? (
        <H3>{`Add a new post :)`}</H3>
      ) : (
        <PostsContainer>
          {postIds.map((postId) => (
            <GridItem
              postId={postId}
              handleOpenContent={handleOpenContent}
              thumbnailUrl={postThumbnailById[postId].thumbnailUrl}
            />
          ))}
        </PostsContainer>
      )}
    </>
  );
}

export default Album;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const AbsoluteGoBackButton = styled(GoBackButton)`
  position: absolute;
  left: 0;
`;

const Title = styled.h1`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  line-height: 100%;

  font-size: 1.625rem;
  color: #505050;
`;

const H3 = styled.h3`
  margin-top: 8rem;
  text-align: center;
  font-size: 1.25rem;
  color: #505050;
`;

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
