# Documentation Frontend - DoCloud Client

Cette interface est une **Single Page Application** construite avec **Next.js 14** et **TypeScript**.

## Architecture du Projet

Le projet utilise l'**App Router** de Next.js pour une gestion optimisée des routes et des performances.

* **`src/app/pages/`** : Contient les différentes routes de l'application (Dashboard, Login, Register).
* **`src/app/assets/`** : Ressources graphiques (logos, icônes de gestion) utilisées dans l'interface.
* **CSS Modules** : Chaque page possède son propre fichier `.module.css` pour éviter les conflits de styles et garantir une maintenance facile.

---

## Fonctionnalités Clés

### 1. Dashboard Dynamique

Le Dashboard centralise la gestion des documents :

* **Affichage en liste** : Organisation horizontale avec logo, titre, date et nom du propriétaire.
* **Recherche en temps réel** : Filtrage instantané des documents par titre via une barre de recherche.
* **Responsive Design** : L'interface s'adapte automatiquement aux mobiles grâce à des *media queries* spécifiques.

### 2. Gestion des Fichiers

* **Upload par Modale** : Utilisation d'un overlay pour l'ajout de nouveaux PDF, améliorant l'expérience utilisateur.
* **Suppression sécurisée** : Bouton d'action avec confirmation pour éviter les erreurs de manipulation.

### 3. Authentification & Persistence

* **Stockage Local** : Utilisation du `localStorage` pour conserver le jeton JWT (`access`).
* **Route Guards** : Vérification de la présence du token pour afficher conditionnellement les boutons "Dashboard" ou "Connexion" sur la page d'accueil.

---

## Installation et Développement

1. **Dépendances** : `npm install`
2. **Variables d'environnement** : Créer un `.env.local` avec `NEXT_PUBLIC_API_URL=http://localhost:8000/api`.
3. **Lancement** : `npm run dev`
