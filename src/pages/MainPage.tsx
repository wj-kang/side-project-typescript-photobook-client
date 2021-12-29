import styled from 'styled-components';
import GridList from '../features/gridList/GridList';

export default function MainPage() {
  return (
    <PageContainer>
      <PageContent>
        <GridList />
      </PageContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageContent = styled.div`
  width: min(50rem, 100%);
  min-width: 20rem;
`;
