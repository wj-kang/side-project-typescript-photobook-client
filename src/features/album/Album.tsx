/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { mediaQueries } from '../../styles/mediaQueries';

function Album() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAlertOn, setAlertOn] = useState<boolean>(false);
  const { albumTag } = useParams();
  const { postIds, postThumbnailById, editModeOn, albumName, status } = useAppSelector((state) => state.album);
  const [contentOpen, setContentOpen] = useState({ isOpen: false, postId: 0 });

  useEffect(() => {
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
    // eslint-disable-next-line no-restricted-globals
    navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_URL}/shared/${albumTag}`);
    setAlertOn(true);
    setTimeout(() => setAlertOn(false), 2500);
  }

  return (
    <>
      {status === 'failed' ? navigate('/main') : null}
      {contentOpen.isOpen ? <Content postId={contentOpen.postId} handleClose={handleCloseContent} /> : null}

      <AlertMessageContainer isAlertOn={isAlertOn}>
        <AlertMessage>Link Copied!</AlertMessage>
      </AlertMessageContainer>

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
              <Button variant="outlined" color="info" onClick={handleClickShareLink}>
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

const AlertMessageContainer = styled.div<{ isAlertOn: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 98;
  text-align: center;
  transition: all 200ms ease-in;
  opacity: 0.85;
  ${(props) => (props.isAlertOn ? 'top: 4rem;' : 'top: -4rem;')};
`;

const AlertMessage = styled.div`
  height: 2.5rem;
  line-height: 2.5rem;
  background: #26c06c;
  color: #ffffff;
`;
const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const AbsoluteGoBackButton = styled(GoBackButton)`
  position: absolute;
  left: 0;
`;

const Title = styled.h1`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100%;
  font-size: 1.625rem;
  color: #505050;
  ${mediaQueries('md')('font-size: 1.5rem; ')}
`;

const ButtonsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-left: 0.5rem;
  ${mediaQueries('md')('margin-left: 0.3rem;')}
`;

const PostsContainer = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const H3 = styled.h3`
  margin-top: 8rem;
  text-align: center;
  font-size: 1.25rem;
  color: #505050;
`;
