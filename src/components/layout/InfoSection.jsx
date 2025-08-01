// src/components/sections/InfoSection.jsx
import { Container, Stack, Typography, Box, Button } from "@mui/material";
import PropTypes from "prop-types";

export default function InfoSection({
  title = "Por que uma viagem bem planejada faz diferença",
  text = "Viajar bem planejado reduz o estresse da jornada e aumenta o prazer antes mesmo de embarcar. A antecipação de uma viagem já eleva o humor e a sensação de bem-estar, e férias — mesmo curtas — diminuem níveis de estresse e melhoram a recuperação nas semanas seguintes. Um roteiro organizado também corta a fadiga de decisão ao tirar pequenas escolhas do caminho, deixando energia para o que importa: viver a experiência.",
  padding = 4,
  align = "center",
  showCta = false,
  ctaLabel = "Peça um orçamento",
  onCtaClick = () => {},
  bg = "grey.50",          // << fundo sutil para separar
  withDivider = false,     // << bordas superior/inferior opcionais
}) {
  return (
    <Box
      component="section"
      sx={{
        p: padding,
        bgcolor: bg,
        borderTop: withDivider ? 1 : 0,
        borderBottom: withDivider ? 1 : 0,
        borderColor: withDivider ? "divider" : "transparent",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{
            maxWidth: 900,
            mx: "auto",
            textAlign: align,
            alignItems: align === "center" ? "center" : "flex-start",
          }}
        >
          {title && (
            <Typography variant="h4" gutterBottom align={align}>
              {title}
            </Typography>
          )}

          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {text}
          </Typography>

          {showCta && (
            <Button
              variant="contained"
              color="primary"
              onClick={onCtaClick}
              sx={{ mt: 1 }}
            >
              {ctaLabel}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

InfoSection.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  showCta: PropTypes.bool,
  ctaLabel: PropTypes.string,
  onCtaClick: PropTypes.func,
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  withDivider: PropTypes.bool,
};
