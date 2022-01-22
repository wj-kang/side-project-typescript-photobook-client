import { useNavigate } from 'react-router-dom';
import authAPI from '../apis/authAPI';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    authAPI.post('/logout').then(() => navigate('/'));
  }

  return (
    <NavbarContainer>
      <Title onClick={(e) => navigate('/main')}>PhotoBook 📚</Title>

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
`;

const Title = styled.h1`
  margin-left: 3rem;
  font-family: 'Baloo Bhai 2', cursive;
  font-size: 2rem;

  cursor: pointer;
  transition: all 300ms ease-in;
  :hover {
    opacity: 0.7;
  }
`;

const HeaderBtns = styled.div`
  margin-right: 3rem;
  display: flex;
  font-size: 2rem;
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
