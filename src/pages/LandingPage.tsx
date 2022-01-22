import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userAPI from '../apis/userAPI';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner';
import { handleGuestEnter } from '../features/user/userSlice';

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);

  useEffect(() => {
    userAPI
      .get('')
      .then(() => navigate('/main'))
      .catch(() => navigate('/'));
  }, []);

  async function handleClickGoogleSignIn() {
    const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECTION_URI;

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email`;
  }
  async function handleClickGithubSignIn() {
    const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_GITHUB_REDIRECTION_URI;

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user:email&redirect_uri=${redirect_uri}`;
  }

  function handleClickGuestEnter() {
    dispatch(handleGuestEnter())
      .then(() => navigate('/main'))
      .catch(console.error);
  }

  return (
    <PageContainer>
      {status === 'loading' ? <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" /> : null}
      <Box>
        <TitleContainer>
          <Title>Photo Book📚</Title>
          <Desc>Keep the memory, share the albums</Desc>
        </TitleContainer>
        <Buttons>
          <Button onClick={handleClickGoogleSignIn}>Sign in with Google</Button>
          <Button onClick={handleClickGithubSignIn}>Sign in with Github</Button>
          <GuestButton onClick={() => dispatch(handleClickGuestEnter)}>Enter as a Guest</GuestButton>
        </Buttons>
      </Box>
    </PageContainer>
  );
}

export default LandingPage;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: url('https://wj-archive.s3.amazonaws.com/buildings-1804479.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
`;

const Box = styled.div`
  width: min(50rem, 100%);
  min-width: 20rem;
  height: 40rem;
  margin: 0 0.5rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(250, 250, 250, 0.85);
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
`;
const Desc = styled.h3`
  font-size: 1.625rem;
`;

const Buttons = styled.div`
  margin-top: 4rem;
  width: min(20rem, 100%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1rem;
  height: 3.5rem;
  font-size: 1.25rem;
  border-radius: 8px;
  border: 1px solid #cacaca;
  background: white;

  cursor: pointer;
  transition: all 250ms ease-in;

  :hover {
    opacity: 0.8;
    transform: scale(1.02);
  }
`;

const GuestButton = styled(Button)`
  background: #00aeff;
  color: white;
`;
