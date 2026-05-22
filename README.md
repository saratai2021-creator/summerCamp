Got it — full **French version only**, clean and ready to copy:

```markdown
# Application Summer Camp

## Description

Cette application web permet la gestion des inscriptions aux ateliers et au Summer Camp.

Les parents peuvent réserver des activités pour leurs enfants, tandis que l’administrateur gère les ateliers, les plannings et les réservations via une interface dédiée.

---

## Fonctionnalités

### Côté utilisateur

- Consulter les ateliers disponibles  
- Réserver :
  - Journée complète  
  - Demi-journée  
  - Atelier individuel  
- Consulter les plannings (enfants / adultes)

### Côté administrateur

- Créer, modifier et supprimer des ateliers  
- Gérer les réservations  
- Suivre les paiements  
- Gérer les capacités  

### Gestion des plannings

- Ajouter des plannings pour :
  - Enfants  
  - Adultes  
- Upload des images de planning  
- Remplacement automatique des anciens plannings  
- Suppression des plannings  

---

## Technologies utilisées

- Frontend : React (React Router)  
- Backend : Laravel (API REST)  
- Base de données : MySQL ou SQLite  
- Stockage : Laravel Storage (images des plannings)  

---

## Structure du projet

```

summercamp/
│
├── frontend/   # Application React
├── backend/    # API Laravel
└── README.md

````

---

## Installation

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
````

Configurer la base de données dans le fichier `.env`.

```bash
php artisan migrate
php artisan serve
```

---

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## Lancement

* Backend : [http://127.0.0.1:8000](http://127.0.0.1:8000)
* Frontend : [http://localhost:5173](http://localhost:5173)

---

## Remarques

* Assurez-vous que MySQL est en marche (si utilisé)
* Vérifiez que l’URL de l’API est correctement configurée côté frontend
* Les images des plannings sont stockées dans : `storage/app/public`

---

## Livrable

* Application fonctionnelle
* Code versionné (GitHub)
* Documentation technique (README)

```
