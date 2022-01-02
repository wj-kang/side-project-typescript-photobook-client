import styled from 'styled-components';

type PhotoInputImgProps = {
  src: string;
};

export default function PhotoInputImg({ src }: PhotoInputImgProps) {
  return <Img src={src} alt="photo image" />;
}

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: solid 1px #b9b9b9;

  cursor: pointer;
  object-fit: cover;
`;
