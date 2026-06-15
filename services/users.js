/**
 * @file services/users.js
 * @description Logique métier pour la gestion des utilisateurs.
 */

const User = require('../models/users');
const jwt = require('jsonwebtoken');

/**
 * Génère un token JWT pour un utilisateur.
 * @param {string} id - ID MongoDB de l'utilisateur
 * @returns {string} Token JWT signé
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

/**
 * Connexion utilisateur.
 * @route POST /users/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    const token = generateToken(user._id);
    res.json({
      message: 'Connecté',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Déconnexion utilisateur.
 * @route GET /users/logout
 */
exports.logout = (req, res) => {
  res.json({ message: 'Déconnecté avec succès' });
};

/**
 * Liste tous les utilisateurs.
 * @route GET /users/
 */
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Récupère un utilisateur par email.
 * @route GET /users/:email
 */
exports.getByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Crée un nouvel utilisateur.
 * @route POST /users/
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });
    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    res.status(201).json({
      message: 'Compte créé',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Modifie un utilisateur.
 * @route PUT /users/:email
 */
exports.update = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.json({
      message: 'Utilisateur mis à jour',
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Supprime un utilisateur.
 * @route DELETE /users/:email
 */
exports.remove = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};