import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleGuestEnter } from '../features/user/userSlice';
import userAPI from '../apis/userAPI';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { mediaQueries } from '../styles/mediaQueries';

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
          <Title>Photo Book 📷</Title>
          <Desc>Keep the memory, share the albums</Desc>
        </TitleContainer>
        <Buttons>
          <Button onClick={handleClickGoogleSignIn}>
            <StyledGoogleIcon />
            Sign in with Google
          </Button>
          <Button onClick={handleClickGithubSignIn}>
            <StyledGithubIcon />
            Sign in with Github
          </Button>
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
  padding: 0 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(250, 250, 250, 0.85);
`;

const TitleContainer = styled.div`
  font-family: 'Baloo Bhai 2';
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  ${mediaQueries('md')('font-size: 3rem;')}
  ${mediaQueries('sm')('font-size: 2.25rem;')}
`;
const Desc = styled.h3`
  font-size: 1.825rem;
  font-weight: 400;
  ${mediaQueries('md')('font-size: 1.5rem;')}
  ${mediaQueries('sm')('font-size: 1.125rem;')}
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

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all 250ms ease-in;

  :hover {
    opacity: 0.8;
    transform: scale(1.02);
  }

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
`;

const GuestButton = styled(Button)`
  background: #28a1da;
  color: white;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  color: #bd3a3a;
  margin-right: 0.5rem;
`;

const StyledGithubIcon = styled(GitHubIcon)`
  color: #0072a7;
  margin-right: 0.5rem;
`;
