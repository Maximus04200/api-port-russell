const Reservation = require('../models/reservations');
const Catway = require('../models/catways');

exports.getAll = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }
    const reservations = await Reservation.find({
      catwayNumber: catway.catwayNumber
    });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    const reservation = await Reservation.create({
      catwayNumber: catway.catwayNumber,
      clientName:   req.body.clientName,
      boatName:     req.body.boatName,
      startDate:    new Date(req.body.startDate),
      endDate:      new Date(req.body.endDate)
    });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(
      req.params.idReservation
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    res.json({ message: 'Réservation supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};