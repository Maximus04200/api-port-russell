/**
 * @file models/catways.js
 * @description Modèle Mongoose pour les catways (pontons) du port Russell.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Numéro unique du catway
 * @property {string} catwayType   - Type : 'long' ou 'short'
 * @property {string} catwayState  - Description de l'état du catway
 */
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro est obligatoire'],
    unique: true
  },
  catwayType: {
    type: String,
    required: true,
    enum: ['long', 'short']
  },
  catwayState: {
    type: String,
    required: [true, "L'état est obligatoire"],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Catway', catwaySchema);