import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <ButtonContainer>
      <StyledButton fontSize="inherit" onClick={() => navigate(-1)} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding-bottom: 0.5rem;
  font-size: 2rem;
`;

const StyledButton = styled(ArrowBackIcon)`
  color: #aaaaaa;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;
