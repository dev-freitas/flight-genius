// src/components/sections/SocialLinksSection.jsx
import { Box, Container, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

export default function SocialLinksSection({
  padding = 4,
  bg = "background.paper",
  links = [
    { icon: "fa-brands fa-instagram", label: "Instagram", href: "https://www.instagram.com/flightgeniusuk" },
    { icon: "fa-brands fa-facebook",  label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61572502870348" },
    { icon: "fa-brands fa-whatsapp",  label: "WhatsApp",  href: "https://wa.me/447459173191" },
    { icon: "fa-regular fa-envelope", label: "Email",     href: "mailto:info@flightgenius.co.uk" },
  ],
}) {
  return (
    <Box component="section" sx={{ p: padding, bgcolor: bg }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {links.map((item, idx) => (
            <Grid key={idx} item>
              <Tooltip title={item.label}>
                <IconButton
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  sx={{
                    width: 56,
                    height: 56,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: "50%",
                  }}
                >
                  <i className={item.icon} style={{ fontSize: "1.25rem" }} aria-hidden="true" />
                </IconButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

SocialLinksSection.propTypes = {
  title: PropTypes.string,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};
