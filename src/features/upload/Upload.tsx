import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { submitNewPost } from '../album/albumSlice';
import { resetUploadState } from './uploadSlice';
import styled from 'styled-components';
import PhotoInputs from '../../components/uploadPage/PhotoInputs';
import TextBox from '../../components/uploadPage/TextBox';
import Button from '../../styles/Button';
import GoBackButton from '../../components/GoBackButton';
import Spinner from '../../components/Spinner';
import { mediaQueries } from '../../styles/mediaQueries';

export default function Upload() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { albumId } = useAppSelector((state) => state.album);
  const { firstImg, secondImg, thirdImg, text } = useAppSelector((state) => state.upload);
  const status = useAppSelector((state) => state.album.status);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firstImg) {
      return; // no image. error case
    }
    const formData = new FormData();
    formData.append('photo1', firstImg);
    formData.append('photo2', secondImg);
    formData.append('photo3', thirdImg);
    formData.append('text', text);
    formData.append('albumId', `${albumId}`);
    dispatch(submitNewPost(formData)).then(() => navigate(-1));
  }
  useEffect(() => {
    dispatch(resetUploadState());
  }, []);

  return (
    <>
      {status === 'loading' ? <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" /> : null}
      <GoBackButton />
      <PageTitle>Add New Post</PageTitle>
      <Form onSubmit={handleSubmit}>
        <PhotoInputs />
        <TextBox />
        <ButtonContainer>
          <ButtonItem isOn={firstImg !== ''}>Submit</ButtonItem>
        </ButtonContainer>
      </Form>
    </>
  );
}

const PageTitle = styled.h1`
  font-size: 1.625rem;
  ${mediaQueries('md')('font-size: 1.5rem;')}
`;

const Form = styled.form`
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 3.5rem;
`;

const ButtonItem = styled(Button)<{ isOn: boolean }>`
  opacity: ${(props) => (props.isOn ? 1 : 0.3)};
  cursor: ${(props) => (props.isOn ? 'pointer' : 'auto')};

  :hover {
    opacity: ${(props) => (props.isOn ? 0.8 : 0.3)};
    transform: ${(props) => (props.isOn ? 'scale(1.01)' : 'none')};
  }
`;
