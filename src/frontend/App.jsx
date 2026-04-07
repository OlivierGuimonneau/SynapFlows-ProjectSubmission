import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Progress from './components/Progress';
import Form from './components/Form';
import SuccessScreen from './components/SuccessScreen';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const TOTAL_STEPS = 6;

  const handleStepChange = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    const required = ['prenom', 'nom', 'email', 'societe', 'type_projet', 'description'];
    const missing = required.filter(k => !formData[k] || formData[k] === '');
    
    if (missing.length > 0) {
      alert('Merci de compléter les champs obligatoires avant l\'envoi.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        submitted_at: new Date().toISOString()
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la soumission');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('[ERREUR SUBMIT]', error);
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-theme="light">
      <Header />
      
      {!submitted ? (
        <>
          <Hero />
          <Progress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          <Form
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            formData={formData}
            onFormChange={handleFormChange}
            onStepChange={handleStepChange}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </>
      ) : (
        <SuccessScreen formData={formData} />
      )}

      <Footer />
    </div>
  );
}
