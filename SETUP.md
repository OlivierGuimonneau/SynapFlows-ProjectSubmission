# Guide de mise en place – SynapFlows avec React + Node

Ce guide vous accompagne pas à pas pour configurer et lancer l'application.

## Prérequis

- **Node.js 16+** et npm installés
- **Compte Airtable** avec accès aux tokens API
- Un terminal/shell (PowerShell, Bash, etc.)

## Étape 1: Préparation initiale

### 1.1 Vérifier l'installation de Node.js

```powershell
node --version   # Devrait afficher v16.0.0 ou plus
npm --version    # Devrait afficher 6.0.0 ou plus
```

Si ce n'est pas le cas, installez Node.js depuis https://nodejs.org/

### 1.2 Cloner ou ouvrir le projet

Si vous travaillez à partir du dossier existant:

```powershell
cd d:\SynapFlows-ProjectSubmission
```

## Étape 2: Installation des dépendances

### 2.1 Installer les packages npm

```powershell
npm install
```

Cela va:
- Télécharger 500+ packages (React, Vite, Express, etc.)
- Créer le dossier `node_modules/`
- Générer `package-lock.json` (ne pas commiter ses modifications)

**Temps estimé**: 2-5 minutes selon votre débit internet

### 2.2 Vérifier l'installation

```powershell
npm list react              # Devrait afficher React 18.2.0
npm list vite               # Devrait afficher Vite 5.0.0
npm list express            # Devrait afficher Express 4.18.2
```

## Étape 3: Configuration Airtable

### 3.1 Générer un token Airtable

1. Allez sur https://airtable.com/account/tokens
2. Cliquez sur "Create token"
3. Donnez un nom (ex: "SynapFlows API")
4. Sélectionnez les permissions:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
5. Cliquez "Create token" et **copiez** le token long généré
   - Format: `pat...` suivi d'une longue chaîne

### 3.2 Identifier votre Base ID

1. Ouvrez votre base Airtable
2. L'URL ressemble à: `https://airtable.com/{BASE_ID}/...`
3. Copiez le `BASE_ID` (commence par `app...`)

**Exemple:**
```
https://airtable.com/appvGEsLWrImfUU9i/tblXXX/...
                     ^^^^^^^^^^^^^^^^^^
                     Votre BASE_ID
```

### 3.3 Créer le fichier `.env`

À la racine du projet, créez un fichier `.env`:

```bash
AIRTABLE_BASE_ID=appvGEsLWrImfUU9i
AIRTABLE_TABLE=Projets Soumis
AIRTABLE_TOKEN=patXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
PORT=5000
NODE_ENV=development
```

**⚠️ Sécurité**: Ne commititez JAMAIS `.env` – il est déjà dans `.gitignore`

### 3.4 Vérifier la table Airtable

Votre base doit avoir une table `Projets Soumis` (ou renommer dans `.env`) avec ces colonnes:

```
Prénom (Text)
Nom (Text)
Email (Email)
Téléphone (Phone)
Fonction (Text)
Entreprise (Text)
Type de projet (Single select ou Text)
Description du projet (Long text)
...et toutes les autres selon le formulaire
```

Les colonnes peuvent être créées automatiquement selon votre configuration Airtable.

## Étape 4: Lancer l'application

### 4.1 Mode développement (avec Hot Reload)

Ouvrez **deux** terminaux:

**Terminal 1 - Frontend avec Vite** (hot reload):
```powershell
npm run dev
```

Cela démarre Vite sur `http://localhost:5173`

**Terminal 2 - Backend Node** (ou continuer dans le même):
```powershell
# Attendez que Vite démontre son URL, puis:
npm start
```

Cela démarre Express sur `http://localhost:5000`

### 4.2 Accéder à l'application

Ouvrez votre navigateur et allez à:

**http://localhost:5000**

Vous devriez voir:
- Le header SynapFlows
- Le formulaire multi-étapes
- La barre de progression

### 4.3 Tester le formulaire

1. Remplissez le formulaire de bout en bout
2. Cliquez "Envoyer la demande"
3. Vous devriez voir l'écran de succès
4. Dans Airtable, une nouvelle ligne doit apparaître dans la table `Projets Soumis`

## Étape 5: Build pour production

### 5.1 Compiler le frontend React

```powershell
npm run build
```

Cela:
- Compile le code React/JSX en JavaScript optimisé
- Génère les fichiers statiques dans `/public`
- Minifie et bundle tout pour la performance

### 5.2 Lancer en mode production

```powershell
npm start
```

L'application fonctionne exactement comme en dev, mais avec du code optimisé (plus rapide).

## Dossier structure & fichiers clés

```
d:\SynapFlows-ProjectSubmission\
├── src/frontend/               # Code React (source)
│   ├── App.jsx                 # Composant principal
│   ├── App.css                 # Styles globaux
│   ├── index.jsx               # Point d'entrée React
│   ├── index.html              # Template HTML
│   └── components/             # Composants réutilisables
│       ├── Header.jsx
│       ├── Form.jsx
│       ├── SuccessScreen.jsx
│       └── steps/              # Les 6 étapes du formulaire
├── backend/
│   ├── index.js                # Serveur Express
│   ├── routes/submit.js        # Endpoint POST /api/submit
│   └── services/airtable.js    # Logique Airtable
├── public/                     # Fichiers compilés (auto-généré)
├── node_modules/               # Packages npm (ne pas commiter)
├── package.json                # Dépendances et scripts
├── vite.config.js              # Config Vite
├── .env                        # Variables d'environnement (local)
├── .env.example                # Template .env (à commiter)
├── .gitignore                  # Fichiers ignorés par Git
└── README.md                   # Documentation
```

## Commandes utiles

```powershell
# Installer les dépendances
npm install

# Développement avec hot reload
npm run dev

# Build pour production
npm run build

# Serveur production
npm start

# Vérifier une dépendance
npm list react
npm view express version

# Mettre à jour une dépendance
npm update express
```

## Troubleshooting

### ❌ "Cannot find module 'react'"
```powershell
# Supprimez node_modules et réinstallez
rm -r node_modules package-lock.json
npm install
```

### ❌ "Port 5000 already in use"
Le port est occupé. Soit:
- Fermez l'autre application utilisant le port
- Changez le PORT dans `.env` à `5001` ou autre
- Sur Windows: `Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess`

### ❌ "AIRTABLE_TOKEN is undefined"
- Vérifiez que `.env` existe et contient `AIRTABLE_TOKEN=pat...`
- Vérifiez qu'il n'y a pas d'espace avant/après la valeur
- Le token doit être complet (commence par `pat`, ~100 caractères)

### ❌ "Connection refused" sur Airtable
- Vérifiez votre AIRTABLE_BASE_ID (commence par `app`)
- Vérifiez que le token n'a pas expiré
- Vérifiez la table `AIRTABLE_TABLE` existe (ex: "Projets Soumis")

### ❌ Le formulaire n'envoie pas
- Ouvrez F12 → Onglet "Network"
- Remplissez le formulaire
- Voyez si la requête POST vers `/api/submit` a un code 200 (succès) ou 500 (erreur)
- Consultez la console du serveur pour les logs détaillés

### ✅ Tout fonctionne mais style cassé
- Vérifiez que `/public` existe et contient les fichiers compilés
- Relancez `npm run build`
- Rafraîchissez le navigateur (Ctrl+Shift+R pour vider le cache)

## Prochaines étapes

1. **Customiser les styles**: Modifiez `src/frontend/App.css`
2. **Ajouter des validations**: Améliorez `src/frontend/components/steps/*.jsx`
3. **Ajouter des emails**: Intégrez `nodemailer` dans `backend/routes/submit.js`
4. **Déployer**: Utilisez Render, Railway, Vercel, ou votre plateforme préférée
5. **Améliorer l'ergonomie**: Ajoutez des animations, des confirmations, etc.

Bon développement! 🚀
