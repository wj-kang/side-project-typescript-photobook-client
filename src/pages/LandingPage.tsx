import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import authAPI from '../apis/authAPI';
import { useAppDispatch } from '../app/hooks';
import { userSignInSuccess, UserState } from '../features/user/userSlice';

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleGuestEnter() {
    try {
      const res = await authAPI.get('/guest');
      const { type, email, username, thumbnail }: UserState = res.data;
      dispatch(userSignInSuccess({ type, email, username, thumbnail }));
      navigate('/main/albums');
    } catch (err) {
      console.error(err);
    } finally {
      //
    }
  }

  async function handleGoogleSignIn() {}
  async function handleGithubSignIn() {}

  return (
    <PageContainer>
      <Box>
        <TitleContainer>
          <Title>Photo Book📚</Title>
          <Desc>Keep your memory, share your albums</Desc>
        </TitleContainer>
        <Buttons>
          <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
          <Button onClick={handleGithubSignIn}>Sign in with Github</Button>
          <GuestButton onClick={handleGuestEnter}>Enter as a Guest</GuestButton>
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
