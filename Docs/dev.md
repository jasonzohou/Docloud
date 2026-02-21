# Guide de Développement (DEV.md)

Ce guide détaille les procédures pour configurer l'environnement de développement et les standards de code du projet **DoCloud**.

## 1. Prérequis

Avant de commencer, assurez-vous d'avoir installé :

* **Docker & Docker Compose**
* **Node.js** (v18 ou supérieur)
* **Python** (3.11 ou supérieur)

## 2. Installation de l'environnement

### Backend (Django)

Le backend est conteneurisé pour garantir l'isolation des dépendances.

1. **Construction de l'image** : `docker-compose build`.
2. **Lancement** : `docker-compose up`.
3. **Migrations** : `docker-compose exec web python manage.py migrate`.

### Frontend (Next.js)

Le frontend s'exécute localement pour bénéficier du *Fast Refresh*.

1. **Installation** : `npm install`.
2. **Lancement** : `npm run dev`.
3. **Accès** : `http://localhost:3000`.

---

## 3. Standards de Développement

### Backend : Ajout d'une fonctionnalité

Lors de l'ajout d'un nouveau modèle ou d'un endpoint :

1. **Modèle** : Créer le fichier dans `api/models/`.
2. **Serializer** : Définir les champs dans `api/serializers.py`. Utiliser `ReadOnlyField` pour toute donnée calculée ou liée.
3. **Vue** : Utiliser les `generics` de DRF (ex: `ListCreateAPIView`).
4. **URL** : Enregistrer la route dans `api/urls.py`.

### Frontend : Création d'une page

Le projet utilise l'**App Router**.

1. Créer un dossier dans `src/app/pages/`.
2. Ajouter un fichier `page.tsx` et un fichier `[nom].module.css` pour l'isolation des styles.
3. Utiliser les variables CSS globales (`--main-red`, `--border-color`) définies dans `globals.css`.

---

## 4. Gestion des variables d'environnement

### Backend (`.env`)

```env
POSTGRES_DB=Docloud_db
POSTGRES_USER=root
POSTGRES_PASSWORD=root
DATABASE_NAME=Docloud_db
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_HOST=db
DATABASE_PORT=5432
DJANGO_SECRET_KEY=my_Key
DJANGO_DEBUG=False
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```
