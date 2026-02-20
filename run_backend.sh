#!/bin/bash

# Vérification du fichier .env
if [ ! -f "Backend/.env" ]; then
    echo "Attention: Le fichier Backend/.env est manquant. Création d'un fichier par défaut..."
    echo "POSTGRES_DB=Docloud_db" > Backend/.env
    echo "POSTGRES_USER=root" >> Backend/.env
    echo "POSTGRES_PASSWORD=root" >> Backend/.env
    echo "DATABASE_NAME=Docloud_db" >> Backend/.env
    echo "DATABASE_USER=root" >> Backend/.env
    echo "DATABASE_PASSWORD=root" >> Backend/.env
    echo "DATABASE_HOST=db" >> Backend/.env
    echo "DATABASE_PORT=5432" >> Backend/.env
    echo "DJANGO_SECRET_KEY=my_Key" >> Backend/.env
    echo "DJANGO_DEBUG=False" >> Backend/.env
fi

cd Backend
docker-compose down -v
docker-compose up --build