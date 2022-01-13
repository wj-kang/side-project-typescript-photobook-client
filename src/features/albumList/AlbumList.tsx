import styled from 'styled-components';
import AlbumCards from '../../components/mainPage/AlbumCards';
import albumAPI from '../../apis/albumAPI';
import FormDialog from '../../components/FormDialog';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewAlbum, fetchAlbumList, toggleEditMode, setEditModeOff } from './albumListSlice';
import Button from '@mui/material/Button';
import { useEffect } from 'react';

export default function AlbumList() {
  const dispatch = useAppDispatch();
  const editModeOn = useAppSelector((state) => state.albumList.editModeOn);

  async function handleAlbumCreate(name: string) {
    const res = await albumAPI.post('/new', { albumName: name });
    // const {albumId, albumTag, albumName, thumbnailUrl, count} = res.data;
    dispatch(addNewAlbum(res.data));
    dispatch(fetchAlbumList());
  }

  useEffect(() => {
    dispatch(setEditModeOff());
  }, []);

  return (
    <>
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
