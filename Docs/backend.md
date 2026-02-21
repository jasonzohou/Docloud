# Documentation Backend - DoCloud API

Cette documentation détaille le fonctionnement de l'API développée avec **Django REST Framework (DRF)**.

## Architecture du Projet

Le projet suit l'organisation de Django:

* **`config/`** : Paramètres du projet, gestion des variables d'environnement et configuration globale des URLs.
* **`api/`** : Coeur de l'application contenant la logique métier.
* **`models/pdf_mod.py`** : Structure de la base de données pour les fichiers PDF.
* **`serializers.py`** : Transformation des modèles en JSON (avec gestion du `ReadOnlyField` pour le `owner_name`).
* **`views.py`** : Contrôleurs gérant la logique des requêtes (List, Create, Delete).
* **`tests/`** : Tests unitaires pour l'authentification et la gestion des documents.


* **`docker-compose.yml`** : Gestion des services (Django + PostgreSQL).

---

## Authentification & Sécurité

L'API utilise des **JSON Web Tokens (JWT)** pour sécuriser les échanges.

* **Permission par défaut** : `IsAuthenticated`. La plupart des routes nécessitent un jeton dans le header : `Authorization: Bearer <votre_token>`.
* **Isolation des données** : Un utilisateur ne peut voir, uploader ou supprimer que les documents liés à son propre compte grâce au filtrage automatique dans `get_queryset`.

---

## Endpoints API

### Authentification

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/register/` | Création d'un nouveau compte utilisateur. |
| `POST` | `/api/token/` | Connexion et obtention des jetons (Access & Refresh). |
| `POST` | `/api/token/refresh/` | Rafraîchir le jeton d'accès expiré. |

### Gestion des Documents (PDF)

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/documents/` | Liste les PDF de l'utilisateur connecté (inclut `owner_name`). |
| `POST` | `/api/documents/` | Upload d'un nouveau PDF (limité à l'extension `.pdf`). |
| `DELETE` | `/api/documents/<id>/` | Supprime un document appartenant à l'utilisateur. |

### Utilisateurs

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/user/<id>/` | Récupère les informations publiques d'un utilisateur (id, name, email). |

---

## Composants Techniques Clés

### 1. Serializer

Le `PdfSerializer` utilise un `ReadOnlyField` pour le `owner_name`. Cela permet d'afficher le nom de l'auteur sans permettre au frontend de modifier cette information lors d'un `POST`.

### 2. Validation de Fichier

Un `FileExtensionValidator` est utilisé sur le champ `file` du modèle pour garantir que seuls les fichiers PDF sont acceptés sur le serveur.

### 3. Automatisation Docker

Le `Dockerfile` et le `docker-compose.yml` permettent un déploiement. Ils gèrent :

1. L'installation des dépendances Python.
2. L'attente de la base de données.
3. Les migrations automatiques.
4. La création du superutilisateur `root` pour les tests.
