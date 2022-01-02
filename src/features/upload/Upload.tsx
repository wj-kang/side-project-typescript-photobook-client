import styled from 'styled-components';
import PhotoInputs from '../../components/uploadPage/PhotoInputs';
import TextBox from '../../components/uploadPage/TextBox';
import Button from '../../styles/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetState } from './uploadSlice';

export default function Upload() {
  const dispatch = useAppDispatch();
  const firstImg = useAppSelector((state) => state.upload.firstImg);
  const secondImg = useAppSelector((state) => state.upload.secondImg);
  const thirdImg = useAppSelector((state) => state.upload.thirdImg);
  const text = useAppSelector((state) => state.upload.text);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firstImg) {
      return; // no image. error case
    }

    const formData = new FormData();
    formData.append('photo1', firstImg);
    formData.append('photo2', secondImg);
    formData.append('photo3', thirdImg);
    formData.append('text', text);

    // send formData object
    try {
      // post + spinner on
      alert('SEND FORM DATA');
      //
      dispatch(resetState());
    } catch (err) {
      alert(err);
      dispatch(resetState());
    } finally {
      // spinner off
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <PhotoInputs />
      <TextBox />
      <ButtonContainer>
        <ButtonItem isOn={firstImg !== ''}>Submit</ButtonItem>
      </ButtonContainer>
    </Form>
  );
}

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
