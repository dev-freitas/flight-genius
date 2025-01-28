// src/pages/HomePage.js
import Carousel from '../components/layout/Carousel';
import KeyPointsSection from '../components/ui/KeyPointsSection';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import { Container, Box, Typography, Grid } from '@mui/material';

function HomePage() {
  const testimonials = 
  [
    { "name": "Fran", "text": "Fiquei impressionado! Encontraram o voo perfeito para mim com um preço incrível. O atendimento foi impecável do início ao fim!" },
    { "name": "Bruna", "text": "Simplesmente fantástico! Desde o primeiro contato até a compra do bilhete, fui tratado com muito profissionalismo e atenção. Recomendo de olhos fechados!" },
    { "name": "Abilio", "text": "Se você quer uma experiência de viagem sem estresse, esse é o lugar certo! A equipe realmente entende as necessidades do cliente e oferece soluções sob medida. Nota 10!" }
  ]


  return (
    <Box>
      <Carousel />
      <Container>
        <KeyPointsSection />
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom align="center">
            O que nossos clientes estão dizendo
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((t, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <TestimonialCard {...t} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
