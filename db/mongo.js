const mongoose = require('mongoose');

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

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