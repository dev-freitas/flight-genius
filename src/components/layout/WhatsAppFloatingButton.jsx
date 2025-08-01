// src/components/common/WhatsAppFloatingButton.jsx
import { Box, Fab } from "@mui/material";
import PropTypes from "prop-types";

function buildWaLink(phone, message) {
  // remove tudo que não é dígito
  const digits = (phone || "").replace(/\D/g, "");
  const text = encodeURIComponent(message || "");
  return `https://wa.me/${digits}${text ? `?text=${text}` : ""}`;
}

export default function WhatsAppFloatingButton({
  phone = "+447459173191",
  message = "Olá! Quero solicitar um orçamento 🙂",
  bottom = 24,
  right = 24,
  showOnDesktop = true,
}) {
  const href = buildWaLink(phone, message);

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: (t) => t.zIndex.fab,
        bottom,
        right,
        display: showOnDesktop ? "block" : { xs: "block", md: "none" },
      }}
    >
      <Fab
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        color="success"
        aria-label="WhatsApp"
        sx={{
          bgcolor: "#25D366",
          "&:hover": { bgcolor: "#1DA851" },
          color: "#fff",
        }}
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true" style={{ fontSize: 22 }} />
      </Fab>
    </Box>
  );
}

WhatsAppFloatingButton.propTypes = {
  phone: PropTypes.string,
  message: PropTypes.string,
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  showOnDesktop: PropTypes.bool,
};
