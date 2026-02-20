#!/bin/bash

cd Frontend

if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances frontend..."
    npm install
fi

if [ ! -f ".env.local" ]; then
    echo "Création du fichier .env.local..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
fi

echo "Lancement du Frontend sur http://localhost:3000"
npm run dev