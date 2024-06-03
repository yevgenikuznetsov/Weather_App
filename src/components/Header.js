import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styled from "styled-components";

const HeaderToolbar = styled(Toolbar)`
  gap: 50px;
  display: flex;
  align-items: center;
`;

const Logo = styled(Typography)`
  gap: 10px;
  display: flex;
  margin-right: 16px; 
  align-items: center;
`;

const ButtonContainer = styled.div`
  gap: 16px;
  display: flex;
`;

const LogoLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Header = () => {
    return (
      <AppBar position="static" sx={{ opacity: 0.9 }}>
        <HeaderToolbar>
          <LogoLink to="/">
            <Logo variant="h6">
              <Brightness7Icon/>
              Weather App
            </Logo>
          </LogoLink>

          <ButtonContainer>
            <Button color="inherit" component={Link} to="/">Weather Details</Button>
            <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
          </ButtonContainer>
        </HeaderToolbar>
      </AppBar>
  );
}

export default Header;