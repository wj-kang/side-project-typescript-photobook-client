import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type PhotoSliderProps = {
  photos: {
    photo1: string;
    photo2: string;
    photo3: string;
  };
};

export default function PhotoSlider({ photos }: PhotoSliderProps) {
  const { photo1, photo2, photo3 } = photos;
  console.log(photo1, photo2, photo3);
  const setting = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Container>
      <SliderContainer>
        <StyledSlider {...setting}>
          <ImageDiv url={photo1} />
          {photo2 && <ImageDiv url={photo2} />}
          {photo3 && <ImageDiv url={photo3} />}
        </StyledSlider>
      </SliderContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const StyledSlider = styled(Slider)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #383838;
  color: white;

  .slick-prev {
    left: -4rem;
    z-index: 999;
    :before {
      font-size: 2.5rem;
    }
  }

  .slick-next {
    right: -2.75rem;
    z-index: 999;
    :before {
      font-size: 2.5rem;
    }
  }

  .slick-list,
  .slick-track,
  .slick-slide {
    height: 100%;
  }
  .slick-slide > div {
    height: 100%;
  }
`;

const ImageDiv = styled.div<{ url: string }>`
  height: 100%;
  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
