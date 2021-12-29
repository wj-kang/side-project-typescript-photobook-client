import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import GridItem from '../../components/GridItem';
import { fetchGridList } from './gridListSlice';

function GridList() {
  const dispatch = useAppDispatch();
  const { allIds, thumbnailById } = useAppSelector((state) => state.gridList);

  useEffect(() => {
    dispatch(fetchGridList());
  }, []);

  return (
    <GridListContainer>
      {allIds.map((id) => (
        <GridItem thumbnailUrl={thumbnailById[id].thumbnailUrl} />
      ))}
      {/* <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem /> */}
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
