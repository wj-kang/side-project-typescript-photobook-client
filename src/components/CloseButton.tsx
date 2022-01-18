import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface CloseButtonProps {
  onClick: () => void;
}
export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton fontSize="inherit" onClick={onClick} />
    </ButtonContainer>
  );
}
const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  /* padding-bottom: 0.25rem; */
  font-size: 3rem;
  color: white;
`;

const StyledButton = styled(CloseIcon)`
  margin-right: -0.5rem;
  color: #aaaaaa;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;
