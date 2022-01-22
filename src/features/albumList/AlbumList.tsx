import styled from 'styled-components';
import AlbumCards from '../../components/mainPage/AlbumCards';
import FormDialog from '../../components/FormDialog';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleEditMode, setEditModeOff, createNewAlbum } from './albumListSlice';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner';

export default function AlbumList() {
  const dispatch = useAppDispatch();
  const { editModeOn, status } = useAppSelector((state) => state.albumList);

  async function handleAlbumCreate(name: string) {
    dispatch(createNewAlbum(name));
  }

  useEffect(() => {
    if (editModeOn) dispatch(setEditModeOff());
  }, []);

  return (
    <>
      {status === 'loading' ? <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" /> : null}
      <Title>My Albums</Title>
      <ButtonsContainer>
        <Button
          variant={editModeOn ? 'contained' : 'outlined'}
          color={editModeOn ? 'warning' : 'info'}
          onClick={() => dispatch(toggleEditMode())}
        >
          {editModeOn ? 'Done' : 'Edit'}
        </Button>
        {!editModeOn && (
          <ButtonContainer>
            <FormDialog
              buttonText="New Album"
              dialogTitle="New Album"
              label="Enter an album name"
              next={(name: string) => handleAlbumCreate(name)}
            />
          </ButtonContainer>
        )}
      </ButtonsContainer>
      <AlbumsContainer>
        <AlbumCards />
      </AlbumsContainer>
    </>
  );
}
const Title = styled.h1`
  width: 100%;
  text-align: center;
  line-height: 100%;

  font-size: 1.625rem;
  color: #505050;
`;

const ButtonsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: end;
`;

const ButtonContainer = styled.div`
  margin-left: 0.5rem;
`;

const AlbumsContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
`;
