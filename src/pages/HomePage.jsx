// src/pages/HomePage.js
import KeyPointsSection from '../components/ui/KeyPointsSection';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import { Container, Box, Typography, Grid } from '@mui/material';
import HeroBanner from "../components/layout/HeroBanner";
import InfoSection from "../components/layout/InfoSection";
import SocialLinksSection from "../components/layout/SocialLinksSection";
import brazil from "../assets/images/brazil1.jpg";

function HomePage() {
  const testimonials = 
  [
    { "name": "Fran", "text": "Fiquei impressionado! Encontraram o voo perfeito para mim com um preço incrível. O atendimento foi impecável do início ao fim!" },
    { "name": "Bruna", "text": "Simplesmente fantástico! Desde o primeiro contato até a compra do bilhete, fui tratado com muito profissionalismo e atenção. Recomendo de olhos fechados!" },
    { "name": "Abilio", "text": "Se você quer uma experiência de viagem sem estresse, esse é o lugar certo! A equipe realmente entende as necessidades do cliente e oferece soluções sob medida. Nota 10!" }
  ]


  return (
    <Box>
      <HeroBanner
        image={brazil}
        title="Bora Viajar..."
        ctaPrimary={{ label: "Request a quote", onClick: () => {/* open form */} }}
        align="left"
      />
      {/* <FlightSearch /> */}
      <Container>
      <SocialLinksSection
        bg="grey.50"
        links={[
          { icon: "fa-brands fa-instagram", label: "Instagram", href: "https://www.instagram.com/flightgeniusuk" },
          { icon: "fa-brands fa-facebook",  label: "Facebook",  href: "https://www.facebook.com/photo/?fbid=122101537118750095&set=a.122101512944750095" },
          { icon: "fa-brands fa-whatsapp",  label: "WhatsApp",  href: "https://wa.me/447459173191" },
          { icon: "fa-regular fa-envelope", label: "Email",     href: "mailto:info@flightgenius.co.uk" },
        ]}
      />
        <KeyPointsSection />
        <InfoSection bg="#bbbab842" />
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
