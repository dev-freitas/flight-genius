import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

function TestimonialCard({ name, text, avatarUrl }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        boxShadow: 2,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
      }}
      aria-label={`Depoimento de ${name}`}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {avatarUrl ? (
            <Avatar
              alt={name}
              src={avatarUrl}
              sx={{ width: 56, height: 56 }}
            />
          ) : (
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
              {name.charAt(0)}
            </Avatar>
          )}
        </Box>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <FormatQuoteIcon
            sx={{ position: 'absolute', top: -10, left: -10, color: 'primary.main', fontSize: 40 }}
          />
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontStyle: 'italic',
              paddingLeft: 3,
              paddingRight: 3,
              color: 'text.primary',
            }}
          >
            {text}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0, textAlign: 'right' }}>
        <Typography variant="body2" fontWeight="bold" color="secondary.main">
          - {name}
        </Typography>
      </Box>
    </Card>
  );
}

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string, // Opcional
};

TestimonialCard.defaultProps = {
  avatarUrl: '', // Valor padrão vazio
};

export default TestimonialCard;

