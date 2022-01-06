import styled from 'styled-components';
import { Button } from '@mui/material';
import AlbumCards from '../../components/mainPage/AlbumCards';

export default function AlbumList() {
  return (
    <>
      <ButtonsContainer>
        <Button variant="contained">New Album</Button>
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

const AlbumsContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
`;
