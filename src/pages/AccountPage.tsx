import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner';
import { handleDeleteAccount } from '../features/user/userSlice';
import { mediaQueries } from '../styles/mediaQueries';

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.user);
  const [btnOn, setBtnOn] = useState<boolean>(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>('');
  function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!btnOn) return;
    dispatch(handleDeleteAccount()).then(() => navigate('/'));
  }

  return (
    <>
      {status === 'loading' && <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" />}
      <Container>
        <Box>
          <Title>Delete Account</Title>
          <Desc>
            To confirm, type <strong>permanently delete</strong> in the field.
          </Desc>
          <Form onSubmit={handleDelete}>
            <TextInput
              value={deleteConfirmText}
              onChange={(e) => {
                setDeleteConfirmText(e.target.value);
                e.target.value === 'permanently delete' ? setBtnOn(true) : setBtnOn(false);
              }}
              type="text"
              placeholder="permanently delete"
            />
            <Btn type="submit" btnOn={btnOn}>
              Confirm
            </Btn>
          </Form>
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const Box = styled.div`
  border: 1px solid #a0a0a0;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  color: #303030;
`;

const Title = styled.h1`
  font-size: 2rem;
`;
const Desc = styled.p`
  margin-top: 0.5rem;
`;

const Form = styled.form`
  margin-top: 2.5rem;
  width: 100%;
  display: flex;

  ${mediaQueries('sm')('flex-direction: column;')}
`;

const TextInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  border: 1px solid #c0c0c0;
  border-radius: 0.5rem;
`;

const Btn = styled.button<{ btnOn: boolean }>`
  width: 6rem;
  height: 3rem;
  margin-left: 0.25rem;
  font-size: 1rem;
  outline: none;
  border: 1px solid #c0c0c0;
  border-radius: 0.5rem;
  transition: all 300ms ease-in;
  color: white;
  cursor: ${(props) => (props.btnOn ? 'pointer' : 'auto')};
  background: ${(props) => (props.btnOn ? '#850000' : '#c0c0c0')};
  :hover {
    ${(props) => (props.btnOn ? 'opacity: 0.8; transform: scale(1.01);' : null)}
  }

  ${mediaQueries('sm')('margin-left: 0; width: 100%; margin-top: 0.4rem;')}
`;
