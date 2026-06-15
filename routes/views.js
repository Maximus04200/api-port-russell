const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Reservation = require('../models/reservations');
const Catway = require('../models/catways');
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



router.get('/catways', requireLogin, async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways', { catways });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.post('/catways', requireLogin, async (req, res) => {
  try {
    await Catway.create(req.body);
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways', { catways, success: 'Catway ajouté avec succès' });
  } catch (err) {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways', { catways, error: err.message });
  }
});


router.get('/catways/:id', requireLogin, async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.redirect('/catways');
    res.render('catway-detail', { catway });
  } catch (err) {
    res.redirect('/catways');
  }
});


router.put('/catways/:id', requireLogin, async (req, res) => {
  try {
    await Catway.findByIdAndUpdate(
      req.params.id,
      { catwayState: req.body.catwayState },
      { new: true }
    );
    res.redirect('/catways');
  } catch (err) {
    res.redirect('/catways');
  }
});


router.delete('/catways/:id', requireLogin, async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.redirect('/catways');
  } catch (err) {
    res.redirect('/catways');
  }
});


router.get('/reservations', requireLogin, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ startDate: 1 });
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('reservations', { reservations, catways });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.post('/reservations', requireLogin, async (req, res) => {
  try {
    const catway = await Catway.findById(req.body.catwayId);
    if (!catway) throw new Error('Catway introuvable');

    await Reservation.create({
      catwayNumber: catway.catwayNumber,
      clientName:   req.body.clientName,
      boatName:     req.body.boatName,
      startDate:    new Date(req.body.startDate),
      endDate:      new Date(req.body.endDate)
    });

    const reservations = await Reservation.find().sort({ startDate: 1 });
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('reservations', { reservations, catways, success: 'Réservation ajoutée' });
  } catch (err) {
    const reservations = await Reservation.find().sort({ startDate: 1 });
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('reservations', { reservations, catways, error: err.message });
  }
});


router.get('/reservations/:id', requireLogin, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.redirect('/reservations');
    res.render('reservation-detail', { reservation });
  } catch (err) {
    res.redirect('/reservations');
  }
});


router.put('/reservations/:id', requireLogin, async (req, res) => {
  try {
    await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        clientName: req.body.clientName,
        boatName:   req.body.boatName,
        startDate:  new Date(req.body.startDate),
        endDate:    new Date(req.body.endDate)
      },
      { new: true }
    );
    res.redirect('/reservations');
  } catch (err) {
    res.redirect('/reservations');
  }
});


router.delete('/reservations/:id', requireLogin, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/reservations');
  } catch (err) {
    res.redirect('/reservations');
  }
});


module.exports = router;