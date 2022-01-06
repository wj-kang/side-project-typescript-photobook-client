import styled from 'styled-components';

type GridItemProps = {
  thumbnailUrl: string;
};

export default function GridItem({ thumbnailUrl }: GridItemProps) {
  return (
    <GridItemContainer>
      <Item>
        <ItemImg src={thumbnailUrl} />
      </Item>
    </GridItemContainer>
  );
}

const GridItemContainer = styled.div`
  width: 31%;
  margin: 1.167%;
  cursor: pointer;
  transition: all 250ms ease;
  :hover {
    opacity: 0.7;
  }
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const ItemImg = styled.img`
  position: absolute;
  /* width: 100%; */
  height: 100%;
  border: 1px solid #f0f0f0;
  object-fit: cover;
`;
