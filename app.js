const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { connect } = require('./db/mongo');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');



if (process.env.NODE_ENV === 'production') {
} else {
  dotenv.config({ path: './env/.env.dev' });
}

connect();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
const methodOverride = require('method-override');

app.use(session({
  secret: process.env.SECRET_KEY || 'secret_fallback',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/users', require('./routes/users'));
app.use('/', require('./routes/views'));
app.use('/api/catways', require('./routes/catways'));
app.use('/api/catways/:id/reservations', require('./routes/reservations'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

module.exports = app;