// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0095de', // dark blue
    },
    secondary: {
      main: '#0095de', // Blue
    },
    // Você pode adicionar cores personalizadas adicionais aqui, se necessário
    custom: {
      heading: '#1976d2', // Exemplo de cor personalizada para headings
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      color: '#003ade', // Utiliza a cor primary do tema
    },
    h5: {
      color: '#0095de', // Utiliza a cor secondary do tema
    },
    h6: {
      color: '#1976d2', // Utiliza a cor personalizada
    },
    // Personalize outras variantes conforme necessário
  },
});

export default theme;
