import styled from 'styled-components';

function Navbar() {
  return (
    <NavbarContainer>
      <h1>navbar</h1>
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  z-index: 999;
  opacity: 0.95;
  background-color: #b5ffff;
`;
