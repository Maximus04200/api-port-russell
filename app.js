const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('./db/mongo');

dotenv.config({ path: './env/.env.dev' });

connect();

const app = express();

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./routes/users'));
app.use('/', require('./routes/views'));
app.use('/api/catways', require('./routes/catways'));
app.use('/api/catways/:id/reservations', require('./routes/reservations'));

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

module.exports = app;