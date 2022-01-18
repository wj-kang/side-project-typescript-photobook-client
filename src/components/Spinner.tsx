import styled from 'styled-components';

interface SpinnerProps {
  backgroundColor?: string;
}
export default function Spinner({ backgroundColor }: SpinnerProps) {
  return (
    <Background backgroundColor={backgroundColor}>
      <Loader />
    </Background>
  );
}

const Background = styled.div<{ backgroundColor?: string }>`
  z-index: 999;
  background: ${(props) => props.backgroundColor}
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  z-index: 999;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 3.5rem;
  height: 3.5rem;

  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
