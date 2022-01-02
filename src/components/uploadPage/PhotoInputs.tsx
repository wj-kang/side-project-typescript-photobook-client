import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addImage } from '../../features/upload/uploadSlice';
import PhotoInputIcon from './PhotoInputIcon';
import PhotoInputImg from './PhotoInputImg';

function PhotoInputs() {
  const dispatch = useAppDispatch();
  const firstImg = useAppSelector((state) => state.upload.firstImg);
  const secondImg = useAppSelector((state) => state.upload.secondImg);
  const thirdImg = useAppSelector((state) => state.upload.thirdImg);

  function handleAddImage(e: any, slot: 1 | 2 | 3) {
    if (e.target.files[0] === undefined) {
      return;
    }
    dispatch(addImage({ slot, file: e.target.files[0] }));
  }

  return (
    <PhotosInputContainer>
      <PhotoLabel onChange={(e) => handleAddImage(e, 1)}>
        {firstImg ? <PhotoInputImg src={URL.createObjectURL(firstImg)} /> : <PhotoInputIcon />}
        {InputTag}
      </PhotoLabel>

      <PhotoLabel onChange={(e) => handleAddImage(e, 2)}>
        {secondImg ? <PhotoInputImg src={URL.createObjectURL(secondImg)} /> : <PhotoInputIcon />}
        {InputTag}
      </PhotoLabel>

      <PhotoLabel onChange={(e) => handleAddImage(e, 3)}>
        {thirdImg ? <PhotoInputImg src={URL.createObjectURL(thirdImg)} /> : <PhotoInputIcon />}
        {InputTag}
      </PhotoLabel>
    </PhotosInputContainer>
  );
}

export default PhotoInputs;

const PhotosInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PhotoLabel = styled.label`
  position: relative;
  width: 31%;
  padding-bottom: 31%;
  margin: 0.5rem;
  border-radius: 8px;
  background: #d0d0d0;

  :hover {
    opacity: 0.7;
    transform: scale(1.01);
  }
`;

const InputTag: JSX.Element = (
  <input style={{ display: 'none' }} type="file" accept="image/jpg,impge/png,image/jpeg,image/gif" />
);
