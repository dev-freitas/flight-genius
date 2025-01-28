// src/components/layout/Navbar.js
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// Import your logo image
import flightLogo from '../../assets/images/flightgenius_logo2_transparente.png';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'A Empresa', path: '/about' },
    { text: 'Contato', path: '/contact' },
    { text: 'Cotação Personalizada', path: '/request-quote' },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button component={Link} to={item.path} key={index}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Logo replaces the "Airline Tickets" text */}
          <Box sx={{ flexGrow: 1 }}>
            {/* You can wrap it in Link if you want clicking the logo to go Home */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box
                component="img"
                src={flightLogo}
                alt="Flight Genius Logo"
                sx={{ height: 40 }} // adjust as needed
              />
            </Link>
          </Box>

          {/* Desktop Menu */}
          {!isMobile &&
            menuItems.map((item, index) => (
              <Button color="inherit" component={Link} to={item.path} key={index}>
                {item.text}
              </Button>
            ))
          }

          {/* Mobile Menu Icon */}
          {isMobile && (
            <>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
