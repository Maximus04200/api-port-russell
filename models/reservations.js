/**
 * @file models/reservations.js
 * @description Modèle Mongoose pour les réservations de catways.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Reservation
 * @property {number} catwayNumber - Numéro du catway réservé
 * @property {string} clientName   - Nom du client
 * @property {string} boatName     - Nom du bateau
 * @property {Date}   startDate    - Date de début
 * @property {Date}   endDate      - Date de fin
 */
const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire']
  },
  clientName: {
    type: String,
    required: [true, 'Le nom du client est obligatoire'],
    trim: true
  },
  boatName: {
    type: String,
    required: [true, 'Le nom du bateau est obligatoire'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est obligatoire']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est obligatoire']
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);