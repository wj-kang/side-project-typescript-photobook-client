import styled from 'styled-components';
import GridItem from '../../components/GridItem';

function GridList() {
  return (
    <GridListContainer>
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </GridListContainer>
  );
}

export default GridList;

const GridListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  background-color: #92ee92;
`;
