# Utiliser une image Node.js officielle et légère
FROM node:20-alpine

# Créer et définir le dossier de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de dépendances en premier (optimisation du cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install --omit=dev

# Copier tout le reste du code source
COPY . .

# Exposer le port que ton app utilise (5000 d'après ton docker-compose)
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]