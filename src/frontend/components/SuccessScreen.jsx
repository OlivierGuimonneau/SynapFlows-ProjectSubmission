import React from 'react';

export default function SuccessScreen({ formData }) {
  const lines = (label, value) => (
    <div key={label} className="summary-row">
      <div className="summary-key">{label}</div>
      <div>
        {value || '—'}
      </div>
    </div>
  );

  const formatValue = (val) => {
    if (Array.isArray(val)) return val.join(', ');
    return val || '—';
  };

  const handlePrint = () => window.print();

  return (
    <section className="success active">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2>Demande envoyée</h2>
      <p>Le projet est désormais préqualifié. Vous pouvez utiliser ce récapitulatif comme base pour préparer votre cahier des charges ou votre première proposition commerciale.</p>
      
      <div className="summary">
        {lines('Contact', `${formData.prenom || ''} ${formData.nom || ''} · ${formData.email || ''}`)}
        {lines('Entreprise', formData.societe)}
        {lines('Type de projet', formData.type_projet)}
        {lines('Description', formData.description)}
        {lines('Fonctionnalités', formatValue(formData.fonctions))}
        {lines('Utilisateurs lancement', formData.users_launch)}
        {lines('Profils', formatValue(formData.profils))}
        {lines('Ambiance', formatValue(formData.ambiance))}
        {lines('Budget', formData.budget)}
        {lines('Délai', formData.delai)}
      </div>

      <div className="nav" style={{ justifyContent: 'center' }}>
        <button className="btn btn-primary btn-lg" onClick={handlePrint}>
          Imprimer / PDF
        </button>
      </div>
    </section>
  );
}
