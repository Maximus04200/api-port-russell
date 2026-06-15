const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Reservation = require('../models/reservations');
const jwt = require('jsonwebtoken');


const requireLogin = (req, res, next) => {
  if (!req.session.token) {
    return res.redirect('/');
  }
  next();
};


router.get('/', (req, res) => {
  if (req.session.token) return res.redirect('/dashboard');
  res.render('index');
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.render('index', { error: 'Email ou mot de passe incorrect' });
    }
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    req.session.token = token;
    req.session.user = { id: user._id, username: user.username, email: user.email };
    res.redirect('/dashboard');
  } catch (err) {
    res.render('index', { error: err.message });
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


router.get('/dashboard', requireLogin, async (req, res) => {
  try {
    const today = new Date();
    const reservations = await Reservation.find({
      startDate: { $lte: today },
      endDate:   { $gte: today }
    });
    res.render('dashboard', {
      user: req.session.user,
      reservations,
      today: today.toLocaleDateString('fr-FR')
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;