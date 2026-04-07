# SynapFlows – Application React + Node

Migration complète de votre formulaire de qualification de projet vers une architecture moderne React (frontend) + Express (backend).

## 📋 Structure du projet

```
├── src/
│   └── frontend/
│       ├── components/        # Composants React
│       │   ├── Header.jsx
│       │   ├── Hero.jsx
│       │   ├── Progress.jsx
│       │   ├── Form.jsx
│       │   ├── Footer.jsx
│       │   ├── SuccessScreen.jsx
│       │   └── steps/         # Composants des 6 étapes
│       ├── App.jsx           # Composant principal
│       ├── index.jsx         # Point d'entrée React
│       ├── index.html        # Template HTML
│       └── App.css           # Styles globaux
├── backend/
│   ├── index.js             # Serveur Express
│   ├── routes/
│   │   └── submit.js        # Route pour le formulaire
│   └── services/
│       └── airtable.js      # Service Airtable
├── public/                  # Fichiers statiques servis
├── package.json            # Dépendances
├── vite.config.js          # Configuration Vite
├── .env.example            # Variables d'environnement
└── .env                    # Configuration locale
```

## 🚀 Installation & Démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer l'environnement

Créer un fichier `.env` à la racine (copie de `.env.example`):

```bash
AIRTABLE_BASE_ID=appvGEsLWrImfUU9i
AIRTABLE_TABLE=Projets Soumis
AIRTABLE_TOKEN=votre_token_airtable_ici
PORT=5000
NODE_ENV=development
```

#### Obtenir votre token Airtable:
1. Allez sur https://airtable.com/account/tokens
2. Créez un nouveau token personnel
3. Accordez les permissions: `data.records:read`, `data.records:write`, `schema.bases:read`
4. Copiez le token dans `.env`

### 3. Build et lancer l'application

**Mode développement** (avec rechargement automatique):

```bash
npm run dev
```

L'application démarre sur `http://localhost:5000`

**Mode production** (build + serveur):

```bash
npm run build
npm start
```

## 🎨 Architecture & Points clés

### Frontend (React)

- **App.jsx**: Gère l'état global (étape actuelle, données du formulaire, statut de soumission)
- **Form.jsx**: Affiche le composant d'étape approprié
- **Step1-6.jsx**: Chaque étape du formulaire
- **SuccessScreen.jsx**: Écran de confirmation
- **App.css**: Design système avec variables CSS (thème light/dark)

### Backend (Express)

- **index.js**: Serveur Express principal
  - Sert les fichiers React compilés depuis `/public`
  - Proxy `/api/*` vers les routes API
  
- **routes/submit.js**: Route `POST /api/submit`
  - Valide les données
  - Appelle le service Airtable
  
- **services/airtable.js**: Communication avec l'API Airtable
  - Mappe les champs du formulaire vers la table Airtable
  - Gère les erreurs et les réponses

## 🔄 Flux de données

1. **Utilisateur remplit le formulaire** → Les données sont stockées dans l'état React (`formData`)
2. **Submit** → Envoi POST vers `/api/submit` avec les données JSON
3. **Backend** → Valide et envoie les données à Airtable via HTTPS
4. **Succès** → Affiche l'écran de confirmation avec un résumé

## 🎯 Améliorations par rapport à l'original

✅ **Architecture modulaire**: Code React organisé en composants réutilisables  
✅ **Meilleure gestion d'état**: React hooks pour un code plus maintenable  
✅ **Build moderne**: Vite pour un développement plus rapide  
✅ **Séparation frontend/backend**: Code plus testable et évolutif  
✅ **Thème clair/sombre**: Support natif du mode sombre  
✅ **Responsive**: Design mobile-first  
✅ **Variables d'environnement**: Configuration sans risque de sécurité  

## 📦 Dépendances principales

- **React 18.2**: Framework frontend
- **Vite 5**: Build tool ultra-rapide
- **Express 4**: Serveur Node
- **CORS**: Gestion des cross-origins
- **dotenv**: Gestion des environnements

## 🔍 Débogage

### Logs serveur
Consultez la console du serveur (stderr) pour voir les erreurs et les logs des appels Airtable.

### Logs frontend
Ouvrez la console du navigateur (F12) pour voir les erreurs React et les requêtes réseau.

### Développement avec Hot Reload
En mode `npm run dev`, Vite recharge automatiquement le navigateur lors de modifications.

## 📝 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `AIRTABLE_BASE_ID` | ID de la base Airtable | `appvGEsLWrImfUU9i` |
| `AIRTABLE_TABLE` | Nom de la table de destination | `Projets Soumis` |
| `AIRTABLE_TOKEN` | Token d'authentification Airtable | `pat...` |
| `PORT` | Port du serveur Express | `5000` |
| `NODE_ENV` | Environnement (`development` ou `production`) | `development` |

## 🚢 Déploiement

### Sur Render, Railway ou Heroku

1. Connecter le repo Git
2. Définir les variables d'environnement
3. Build command: `npm run build`
4. Start command: `npm start`
5. Port: utiliser la variable `PORT` (5000 par défaut)

### Sur Vercel (frontend seulement)

Le backend doit rester sur un serveur Node. Une alternative est de déployer le frontend + backend en monolithe sur une plateforme serverless.

## 🐛 Troubleshooting

**"Cannot find module 'react'"**: Relancez `npm install`  
**"Port 5000 already in use"**: Changez le `PORT` dans `.env` ou fermez l'autre processus  
**"AIRTABLE_TOKEN not found"**: Vérifiez votre fichier `.env`  
**"CORS error"**: Le proxy Vite devrait s'en charger en dev. En prod, vérifiez les headers Express.

## 📞 Support

Pour toute question, consultez la documentation:
- [React docs](https://react.dev)
- [Vite docs](https://vitejs.dev)
- [Express docs](https://expressjs.com)
- [Airtable API](https://airtable.com/api)

Bon développement! 🎉
