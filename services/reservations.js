/**
 * @file services/reservations.js
 * @description Logique métier pour la gestion des réservations.
 */

const Reservation = require('../models/reservations');
const Catway = require('../models/catways');

/**
 * Liste toutes les réservations d'un catway.
 * @route GET /api/catways/:id/reservations
 */
exports.getAll = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
    const reservations = await Reservation.find({ catwayNumber: catway.catwayNumber });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Récupère une réservation par son ID.
 * @route GET /api/catways/:id/reservations/:idReservation
 */
exports.getById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).json({ message: 'Réservation introuvable' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Crée une nouvelle réservation.
 * @route POST /api/catways/:id/reservations
 */
exports.create = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
    if (!req.body.clientName || !req.body.boatName || !req.body.startDate || !req.body.endDate) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
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

/**
 * Modifie une réservation.
 * @route PUT /api/catways/:id/reservations/:idReservation
 */
exports.update = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).json({ message: 'Réservation introuvable' });
    if (req.body.clientName) reservation.clientName = req.body.clientName;
    if (req.body.boatName)   reservation.boatName   = req.body.boatName;
    if (req.body.startDate)  reservation.startDate  = new Date(req.body.startDate);
    if (req.body.endDate)    reservation.endDate    = new Date(req.body.endDate);
    await reservation.save();
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Supprime une réservation.
 * @route DELETE /api/catways/:id/reservations/:idReservation
 */
exports.remove = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!reservation) return res.status(404).json({ message: 'Réservation introuvable' });
    res.json({ message: 'Réservation supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};