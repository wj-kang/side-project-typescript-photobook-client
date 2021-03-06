import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editAlbumName, deleteAlbum, fetchAlbumList, setSpinner } from '../../features/albumList/albumListSlice';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Spinner from '../Spinner';
import { fetchAlbum } from '../../features/album/albumSlice';
import { mediaQueries } from '../../styles/mediaQueries';

export default function AlbumCards() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { albumIds, albumInfoById, editModeOn, status } = useAppSelector((state) => state.albumList);

  useEffect(() => {
    dispatch(fetchAlbumList());
  }, []);

  function handleAlbumClick(albumId: number, albumTag: string) {
    if (editModeOn) return;
    dispatch(setSpinner('loading'));
    dispatch(fetchAlbum(albumTag)) //
      .then(() => {
        dispatch(setSpinner(undefined));
        navigate(`/main/${albumTag}`);
      });
  }

  async function handleAlbumDelete(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const { id } = e.currentTarget;
    if (!id) return;
    // eslint-disable-next-line no-restricted-globals
    if (confirm('🚨 DELETE\nPlease confirm to delete this album.\nAll photos in this album will be deleted.')) {
      dispatch(deleteAlbum(Number(id)));
    }
  }

  async function handleAlbumEditName(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const { id } = e.currentTarget;
    let userInput = prompt('✏️EDIT ALBUM NAME\nEnter a new album name you want');
    if (!userInput) {
      userInput = 'Undefined Album Name';
    }
    dispatch(editAlbumName({ albumId: Number(id), albumName: userInput }));
  }

  return (
    <>
      {status === 'loading' ? <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" /> : null}
      {albumIds.length < 1 ? (
        <>
          <H3>{`Create a new memory :)`}</H3>
        </>
      ) : (
        albumIds.map((id) => (
          <CardContainer>
            <ButtonContainer editModeOn={editModeOn}>
              <EditBtn id={`${id}`} fontSize="inherit" onClick={handleAlbumEditName} />

              <DeleteBtn id={`${id}`} fontSize="inherit" onClick={handleAlbumDelete} />
            </ButtonContainer>
            <AlbumCard //
              editModeOn={editModeOn}
              onClick={(e) => handleAlbumClick(albumInfoById[id].albumId, albumInfoById[id].albumTag)}
            >
              <AlbumThumbnailImg
                src={albumInfoById[id].thumbnailUrl || 'https://wj-archive.s3.amazonaws.com/buildings-1804479.jpeg'}
              />
              <AlbumInfo editModeOn={editModeOn}>
                <AlbumTitle>{albumInfoById[id].albumName}</AlbumTitle>
                <AlbumTitle>{`(${albumInfoById[id].count})`}</AlbumTitle>
              </AlbumInfo>
            </AlbumCard>
          </CardContainer>
        ))
      )}
    </>
  );
}

const H3 = styled.h3`
  margin-top: 8rem;
  text-align: center;
  font-size: 1.25rem;
  color: #c0c0c0;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  border: solid 1px #c0c0c0;
  border-radius: 1rem;
`;

const ButtonContainer = styled.div<{ editModeOn: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 2;
  font-size: 2.5rem;
  color: white;

  display: flex;

  ${(props) =>
    props.editModeOn
      ? `z-index: 2;
     `
      : `display: none`}
`;

const EditBtn = styled(EditIcon)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
    color: #40c4ff;
  }
`;

const DeleteBtn = styled(DeleteIcon)`
  margin-left: 1rem;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    color: red;
  }
`;

const AlbumCard = styled.div<{ editModeOn: boolean }>`
  position: relative;
  width: 100%;
  transition: all 250ms ease-in;

  ${(props) =>
    props.editModeOn
      ? ''
      : `:hover {
    opacity: 0.8;
    transform: scale(1.01);
  }
  cursor: pointer;`}
`;

const AlbumThumbnailImg = styled.img`
  width: 100%;
  height: 12rem;
  border-radius: 1rem;
  object-fit: cover;
`;

const AlbumInfo = styled.div<{ editModeOn: boolean }>`
  z-index: 1;
  position: absolute;
  border-radius: 1rem;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;ㅈ

  transition: all 300ms ease-in-out;
  ${(props) =>
    props.editModeOn
      ? `background: rgba(73, 73, 73, 0.85);`
      : `
  background: rgba(73, 73, 73, 0.5)`}
`;

const AlbumTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-right: 0.5rem;
  ${mediaQueries('sm')('font-size: 1.25rem;')}
`;
