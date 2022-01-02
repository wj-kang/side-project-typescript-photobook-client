import styled from 'styled-components';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function PhotoInputIcon() {
  return (
    <Icon>
      <AddCircleIcon style={{ color: 'white', fontSize: '28px' }} />
    </Icon>
  );
}

const Icon = styled.div`
  position: absolute;
  /* top: 0; */
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: solid 1px #d0d0d0;

  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;
