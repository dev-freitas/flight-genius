// src/components/ui/KeyPointsSection.js
import { Box, Grid, Typography } from '@mui/material';

function KeyPointsSection() {
  const points = [
    { "icon": "fa-solid fa-user-check", "title": "Atendimento Personalizado", "text": "Soluções sob medida para suas necessidades." },
    { "icon": "fa-solid fa-handshake", "title": "Experiência Confiável", "text": "Anos de expertise encontrando as melhores ofertas." },
    { "icon": "fa-solid fa-globe", "title": "Destinos pelo Mundo", "text": "Para onde quer que você vá, nós cuidamos de tudo." }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Flight Genius +
      </Typography>
      <Grid container spacing={4}>
        {points.map((point, i) => (
          <Grid item xs={12} sm={4} key={i} style={{ textAlign: 'center' }}>
            <i className={point.icon} style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <Typography variant="h6">{point.title}</Typography>
            <Typography variant="body1">{point.text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default KeyPointsSection;
