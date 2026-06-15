/**
 * @file db/mongo.js
 * @description Configuration et connexion à la base de données MongoDB.
 */

const mongoose = require('mongoose');

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

/**
 * Établit la connexion à MongoDB.
 * Arrête le processus en cas d'échec.
 * @returns {Promise<void>}
 */
const connect = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO, clientOptions);
    console.log('Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur MongoDB :', err.message);
    process.exit(1);
  }
};

module.exports = { connect };