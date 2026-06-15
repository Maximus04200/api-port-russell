## Routes API

### Authentification
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | /users/login | Connexion |
| GET | /users/logout | Déconnexion |

### Catways
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/catways | Liste tous les catways |
| GET | /api/catways/:id | Détail d'un catway |
| POST | /api/catways | Créer un catway |
| PUT | /api/catways/:id | Modifier l'état |
| DELETE | /api/catways/:id | Supprimer |

### Réservations
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/catways/:id/reservations | Liste les réservations |
| GET | /api/catways/:id/reservations/:idReservation | Détail |
| POST | /api/catways/:id/reservations | Créer |
| PUT | /api/catways/:id/reservations/:idReservation | Modifier |
| DELETE | /api/catways/:id/reservations/:idReservation | Supprimer |

### Utilisateurs
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /users | Liste tous les utilisateurs |
| GET | /users/:email | Détail |
| POST | /users | Créer |
| PUT | /users/:email | Modifier |
| DELETE | /users/:email | Supprimer |

## Sécurité

- Authentification JWT (JSON Web Token)
- Mots de passe hachés avec bcrypt
- Routes protégées par middleware
- Variables sensibles dans fichiers .env

## Technologies

- Node.js / Express.js
- MongoDB / Mongoose
- JWT / bcryptjs
- EJS (moteur de templates)
- Railway (déploiement)
