# DoCloud - Gestionnaire de Documents PDF

DoCloud est une application Fullstack (Django / Next.js) permettant aux utilisateurs de s'inscrire, de se connecter et de gérer leurs documents PDF (upload, visualisation, suppression).

## Architecture & Tech Stack

- **Backend** : Django REST Framework (DRF) + PostgreSQL
- **Frontend** : Next.js (React) + CSS
- **Conteneurisation** : Docker & Docker Compose
- **Authentification** : JWT (JSON Web Tokens)

---

##  Installation et Lancement

Le projet est entièrement automatisé. Assurez-vous d'avoir **Docker** et **Node.js** installés sur votre machine.

### 1. Lancer le Backend (Docker)
À la racine du projet, exécutez le script suivant :
```bash
chmod +x run_backend.sh
./run_backend.sh
```

**Ce que fait ce script :**

* Génère automatiquement le fichier `.env` si manquant.
* Lance les conteneurs PostgreSQL et Django en mode "detached".
* Applique les migrations de base de données.
* Crée un compte **administrateur par défaut**.

**Identifiants de test :**

* **Utilisateur** : `root`
* **Mot de passe** : `root`
* **URL API** : `http://localhost:8000`

### 2. Lancer le Frontend (Local)

Dans un nouveau terminal, exécutez :

```bash
chmod +x run_frontend.sh
./run_frontend.sh
```

**Ce que fait ce script :**

* Installe les dépendances via `npm install`.
* Lance le serveur de développement Next.js.

**URL Application** : `http://localhost:3000`

---

## 📂 Structure du Projet

```text
├── Backend/              # API Django & Configuration Docker
│   ├── api/              # Logique métier (Modèles, Vues, Serializers)
│   ├── config/           # Configuration du projet (Settings, URLs)
│   ├── Dockerfile        # Image Python
│   └── docker-compose.yml
├── frontend/             # Application React / Next.js
│   ├── src/              # Composants et Pages
│   └── package.json      # Dépendances Node.js
├── run_backend.sh        # Script d'automatisation Backend
├── run_frontend.sh       # Script d'automatisation Frontend
└── README.md

```

---

##  Fonctionnalités Implémentées

1. **Authentification** : Système complet d'inscription et de login avec jetons JWT.
2. **Gestion des fichiers** : Upload restreint aux fichiers PDF uniquement.
3. **Sécurité des données** : Un utilisateur ne peut voir, télécharger ou supprimer que ses propres documents.
4. **Interface Réactive** : Dashboard dynamique avec gestion des erreurs (401, 400).
5. **Portabilité** : Utilisation de Docker pour garantir le fonctionnement sur n'importe quelle machine.

---

## Notes

* Les fichiers téléchargés sont stockés dans le dossier `Backend/media/pdfs/`.

