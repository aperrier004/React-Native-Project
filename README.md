# Application mobile : Profil Musical
Projet réalisé en 2021 dans le cadre du module de Développement mobile à l'ENSC en deuxième année.
Auteurs : GADEAU Juliette - NDIAYE Mariam - PERRIER ALBAN

# NOTICE D’INSTALLATION
## Installation de Node.js
1. Rendez-vous à l’adresse suivante : https://nodejs.org/en/download/ et téléchargez la version correspondante à votre installation.
2. Installez Node.js

## Installation d’Expo
1. Ouvrez un terminal WIndows puis tapez la commande ci-dessous pour installer Expo.
npm install -g expo-cli
2. Sur votre smartphone, installez ExpoGo à l’aide du lien correspondant :
    1. iOS : https://apps.apple.com/app/apple-store/id982107779
    2. Android : https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www

## Installation de l’application
1. Pour installer le projet, commencez par cloner le projet au lien Github suivant  : https://github.com/ensc-mobi/projet-2021-gadeau_ndiaye_perrier.git
2. Ensuite, ouvrez à l’intérieur du dossier ProfilMusical un invité de commandes.
    Tapez alors “npm install”, puis lancez l’application avec “npm start”.
3. Un QR code apparaît alors. Ouvrez l’application “Expo Go” et scannez ce QR code : l’application se lance automatiquement.
4. Vous arrivez sur la page de connexion. Cliquez sur le bouton “Se connecter”, puis connectez-vous soit à l’aide des identifiants de votre compte personnel, soit avec les identifiants suivants :
    Email : ndl.mariam@icloud.com
    Mot de passe : Profilmusical2022
5. Vous êtes ensuite redirigés sur notre application ProfilMusical.

# Que faire si la connexion à Spotify ne fonctionne pas ? 
C’est-à-dire soit l’application ne vous propose pas de vous connecter à Spotify, soit le lien de redirection ne fonctionne pas (invalid client, invalid redirect uri…).

Il faut copier l’adresse qui se trouve au dessus du QR code dans l’application Expo Go

Dans le code, dans le fichier spotify.token.ts, il faut coller cette adresse à côté de redirectUri (ligne 33) en ajoutant à la suite “/--/”.

Ensuite, il faut copier l’adresse complète avec “/--/” pour l’ajouter à Spotify. 

Pour cela, connectez vous à l’adresse https://developer.spotify.com/dashboard/login avec le compte Spotify suivant : 
Email : ndl.mariam@icloud.com
Mot de passe : Profilmusical2022
Id : profilmusicalgnp

Cliquez sur ProfilMusical, puis “Edit Settings”. Ensuite, collez l’adresse de redirectUri dans la partie Redirect URIs.

Faites “ADD” puis “Save” en bas de page. Vous pouvez maintenant vous connecter.
