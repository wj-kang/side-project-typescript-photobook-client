import { useNavigate } from 'react-router-dom';
import authAPI from '../apis/authAPI';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { mediaQueries } from '../styles/mediaQueries';

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    authAPI.post('/logout').then(() => navigate('/'));
  }

  return (
    <NavbarContainer>
      <Title onClick={(e) => navigate('/main')}>📷 PhotoBook</Title>

      <HeaderBtns>
        <UserBtn onClick={(e) => navigate('/main/account')} fontSize="inherit" />
        <LogoutBtn onClick={handleLogout} fontSize="inherit" />
      </HeaderBtns>
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
  z-index: 99;
  opacity: 0.96;

  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #505050;

  padding: 0 3rem;
  ${mediaQueries('md')('padding: 0 2rem;')}
  ${mediaQueries('sm')('padding: 0 1rem;')}
`;

const Title = styled.h1`
  font-family: 'Baloo Bhai 2', cursive;
  font-size: 2rem;

  cursor: pointer;
  transition: all 300ms ease-in;
  :hover {
    opacity: 0.7;
  }

  ${mediaQueries('md')('font-size: 1.875rem;')}
  ${mediaQueries('sm')('font-size: 1.625rem;')}
`;

const HeaderBtns = styled.div`
  display: flex;
  font-size: 2rem;
  ${mediaQueries('md')('font-size: 1.875rem;')}
`;

const LogoutBtn = styled(LogoutIcon)`
  margin-left: 1.5rem;
  cursor: pointer;
  transition: all 300ms ease-in;
  :hover {
    opacity: 0.7;
  }
`;

const UserBtn = styled(PersonIcon)`
  cursor: pointer;
  transition: all 300ms ease-in;
  :hover {
    opacity: 0.7;
  }
`;
