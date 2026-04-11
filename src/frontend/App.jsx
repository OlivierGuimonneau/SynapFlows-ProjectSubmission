import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Header from './components/Header';
import Hero from './components/Hero';
import FormPage from './pages/FormPage';
import Footer from './components/Footer';
import './styles/index.css';

export default function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcLH7IsAAAAAAj4Ylz9KNcMLC_VJ8AjdenA0QGx">
      <div data-theme="light">
        <Header />
        <Hero />
        <FormPage />
        <Footer />
      </div>
    </GoogleReCaptchaProvider>
  );
}
