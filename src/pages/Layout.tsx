import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Breadcrumb from '../components/mainPage/Breadcrumb';
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <Page>
      <NavbarPosition>
        <Navbar />
      </NavbarPosition>
      <PageContainer>
        <Breadcrumb />
        <Outlet />
      </PageContainer>
    </Page>
  );
}

export default Layout;

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
