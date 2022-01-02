import styled from 'styled-components';
import { onChangeTextarea } from '../../features/upload/uploadSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export default function TextBox() {
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.upload.text);

  return (
    <TextContainer>
      <Text spellCheck={false} value={text} onChange={(e) => dispatch(onChangeTextarea(e.target.value))} />
    </TextContainer>
  );
}

const TextContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 16rem;
`;

const Text = styled.textarea`
  width: 100%;
  height: 100%;
  outline: none;
  resize: none;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 1rem 0.75rem;

  font-size: 1.25rem;
  color: #505050;
`;
