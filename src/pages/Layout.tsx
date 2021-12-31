import styled from 'styled-components';

type LayoutProps = {
  navbar: React.ReactNode;
  children: React.ReactNode;
};

function Layout({ navbar, children }: LayoutProps) {
  return (
    <Page>
      <NavbarPosition>{navbar}</NavbarPosition>
      <PageContainer>{children}</PageContainer>
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
  width: min(50rem, 100%);
  min-width: 20rem;
  background-color: #fcff9a;
`;
