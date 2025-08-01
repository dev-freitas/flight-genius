// src/components/layout/Footer.js
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import cadastur from '../../assets/images/cadastur-seeklogo1.png';

function Footer() {

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Quem Somos', path: '/about' },
    { text: 'Contato', path: '/contact' },
    { text: 'Solicite Cotação', path: '/request-quote' },
  ];

  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        mt: 'auto',
        // Optional: add some padding or height if needed
        py: 2,
      }}
    >
      <Toolbar
        sx={{
          // On mobile: column layout; On larger: row layout
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between', // space out brand and link group
        }}
        >
        <Box
          component="img"
          src={cadastur}
          alt="Flight Genius Logo"
          sx={{
            height: 40,
            maxWidth: '100%',
            mb: { xs: 2, sm: 0 }, // small bottom margin only on mobile
            display: 'block',
          }}
        />
        {/* Left side (Brand or Copyright) */}
        <Typography
          variant="body2"
          sx={{ mb: { xs: 1, sm: 0 } }} // margin-bottom on mobile only
        >
          &copy; {new Date().getFullYear()} Flight Genius
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: { xs: 1, sm: 0 } }} // margin-bottom on mobile only
        >
          CNPJ - 58.298.040/0001-41
        </Typography>

        {/* Right side (Links) */}
        <Box
          sx={{
            // On mobile: stack links vertically; on larger: horizontally
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: { xs: 1, sm: 2 }, // spacing between buttons
            mt: { xs: 1, sm: 0 },  // add top margin on mobile only
          }}
        >
          {menuItems.map((item, index) => (
            <Button
              key={index}
              color="inherit"
              component={Link}
              to={item.path}
              sx={{ textTransform: 'none' }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
