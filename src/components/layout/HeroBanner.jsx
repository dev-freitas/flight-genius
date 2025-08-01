import { Box, Container, Stack, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function HeroBanner({
  image,
  title = "Plan your next trip with us",
  minHeight = { xs: 360, sm: 380, md: 400 },
  align = "left",
}) {
  const navigate = useNavigate();

  const alignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        backgroundImage: `
          linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.45)),
          url(${image})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: { xs: 0, md: 0 },
        boxShadow: { md: 2 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{
            maxWidth: 780,
            alignItems: { xs: "flex-start", md: alignMap[align] },
            textAlign: { xs: "left", md: align },
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: { xs: 48, sm: 58, md: 68 } }}
          >
            {title}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ pt: 1, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/request-quote")}
            >
              Saiba mais
            </Button>

          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

HeroBanner.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ctaSecondary: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
  minHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  align: PropTypes.oneOf(["left", "center", "right"]),
};
