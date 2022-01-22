import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userAPI from '../apis/userAPI';
import Navbar from '../components/Navbar';

function MainPageLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    userAPI //
      .get('')
      .catch(() => navigate('/'));
  }, []);

  return (
    <Page>
      <NavbarPosition>
        <Navbar />
      </NavbarPosition>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </Page>
  );
}

export default MainPageLayout;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavbarPosition = styled.div`
  width: 100%;
  height: 4rem;
`;

const PageContainer = styled.div`
  padding: 1rem 0.5rem;
  width: min(45rem, 100%);
  min-width: 20rem;
`;
