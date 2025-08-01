// src/pages/ContactPage.jsx
import { useRef } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';
import emailjs from '@emailjs/browser';

function ContactPage() {
  const formRef = useRef();

  // Use Vite environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const contactTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, contactTemplateId, formRef.current, publicKey)
      .then(
        (result) => {
          console.log('Message Sent:', result.text);
          alert('Obrigado pelo contato! Embreve entraremos em contato.');
          e.target.reset();
        },
        (error) => {
          console.error('Error:', error.text);
          alert('Oops, something went wrong. Please try again later.');
        }
      );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Contato
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="body1">info@flightgenius.co.uk</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography variant="body1">+44 07459 173191</Typography>
        </Box>

        {/* Example of separate list (if needed) */}
        {/* <Typography variant="body1">Some paragraph text:</Typography>
        <ul>
          <li>Point 1</li>
          <li>Point 2</li>
        </ul> */}

        <form ref={formRef} onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            name="user_name"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email Address"
            name="user_email"
            type="email"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            required
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Send
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ContactPage;
