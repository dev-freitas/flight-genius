// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppFloatingButton from './components/layout/WhatsAppFloatingButton.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import RequestQuotePage from './pages/RequestQuotePage.jsx';
import { Box } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // full viewport height
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-quote" element={<RequestQuotePage />} />
        </Routes>
        <Footer />
        <WhatsAppFloatingButton phone="+447459173191" />
      </Box>
    </Router>
  );
}

export default App;
