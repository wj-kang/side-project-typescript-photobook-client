import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePost } from '../../features/album/albumSlice';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import Spinner from '../Spinner';

type GridItemProps = {
  thumbnailUrl: string;
  handleOpenContent: (postId: number) => void;
  postId: number;
};

export default function GridItem({ postId, handleOpenContent, thumbnailUrl }: GridItemProps) {
  const status = useAppSelector((state) => state.album.status);
  const editModeOn = useAppSelector((state) => state.album.editModeOn);
  const dispatch = useAppDispatch();

  async function handlePostDelete(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.stopPropagation();
    const { id } = e.currentTarget;
    if (!id) return;
    // eslint-disable-next-line no-restricted-globals
    if (confirm('🚨 DELETE\nPlease confirm to delete this post.\nAll photos and text in this post will be deleted.')) {
      dispatch(deletePost(Number(id)));
    }
  }

  return (
    <>
      {status === 'loading' ? (
        <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" />
      ) : (
        <GridItemContainer editModeOn={editModeOn} onClick={(e) => !editModeOn && handleOpenContent(postId)}>
          <Item>
            {editModeOn && (
              <ButtonContainer editModeOn={editModeOn}>
                <DeleteBtn id={`${postId}`} fontSize="inherit" onClick={handlePostDelete} />
              </ButtonContainer>
            )}
            {editModeOn && <ItemDimmer />}
            <ItemImg src={thumbnailUrl} />
          </Item>
        </GridItemContainer>
      )}
    </>
  );
}

const GridItemContainer = styled.div<{ editModeOn: boolean }>`
  width: 31%;
  margin: 1.167%;

  ${(props) =>
    props.editModeOn
      ? ''
      : `:hover {
    opacity: 0.7;
  }
  cursor: pointer;`}
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const ItemDimmer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background: rgba(73, 73, 73, 0.5);
`;

const ItemImg = styled.img`
  position: absolute;
  /* width: 100%; */
  height: 100%;
  border: 1px solid #f0f0f0;
  object-fit: cover;
`;

const ButtonContainer = styled.div<{ editModeOn: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 2;
  font-size: 2.5rem;
  color: white;

  display: flex;

  ${(props) => (props.editModeOn ? `z-index: 2;` : `display: none;`)}
`;

const DeleteBtn = styled(DeleteIcon)`
  margin-left: 1rem;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    color: red;
  }
`;
