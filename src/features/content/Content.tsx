import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PhotoSlider from '../../components/contentPage/PhotoSlider';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getContentData } from './contentSlice';
import CloseButton from '../../components/CloseButton';
import Spinner from '../../components/Spinner';

interface ContentProps {
  handleClose: () => void;
  postId: number;
}

export default function Content({ postId, handleClose }: ContentProps) {
  const dispatch = useAppDispatch();
  const { photos, text, status, error } = useAppSelector((state) => state.content);

  useEffect(() => {
    dispatch(getContentData(postId));
  }, [postId]);

  return (
    <>
      <BackgroundDimmer>
        <Background>
          <Container>
            {status === 'loading' ? (
              <Spinner backgroundColor="rgb(0, 0, 0, 0)" />
            ) : (
              <>
                <CloseButton onClick={handleClose} />
                <PhotoSlider photos={photos} />
                <Textcontainer>{text}</Textcontainer>
              </>
            )}
          </Container>
        </Background>
      </BackgroundDimmer>
    </>
  );
}

const BackgroundDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgb(0, 0, 0, 0.7);
  z-index: 99;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: min(36rem, 100%);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Textcontainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
`;
