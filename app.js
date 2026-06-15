const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('./db/mongo');

dotenv.config({ path: './env/.env.dev' });

connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/catways', require('./routes/catways'));
app.use('/api/catways/:id/reservations', require('./routes/reservations'));

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

module.exports = app;