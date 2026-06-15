/**
 * @file services/catways.js
 * @description Logique métier pour la gestion des catways.
 */

const Catway = require('../models/catways');

/**
 * Liste tous les catways triés par numéro.
 * @route GET /api/catways
 */
exports.getAll = async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Récupère un catway par son ID.
 * @route GET /api/catways/:id
 */
exports.getById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Crée un nouveau catway.
 * @route POST /api/catways
 */
exports.create = async (req, res) => {
  try {
    const catway = await Catway.create(req.body);
    res.status(201).json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Modifie l'état d'un catway.
 * @route PUT /api/catways/:id
 */
exports.update = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndUpdate(
      req.params.id,
      { catwayState: req.body.catwayState },
      { new: true, runValidators: true }
    );
    if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Supprime un catway.
 * @route DELETE /api/catways/:id
 */
exports.remove = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};