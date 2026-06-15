/**
 * @file models/users.js
 * @description Modèle Mongoose pour les utilisateurs de la capitainerie.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @typedef {Object} User
 * @property {string} username - Nom d'utilisateur
 * @property {string} email    - Adresse email unique
 * @property {string} password - Mot de passe haché
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Le nom d'utilisateur est obligatoire"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  }
}, { timestamps: true });

/**
 * Hook pre-save : hache le mot de passe avant sauvegarde.
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

/**
 * Compare un mot de passe en clair avec le hash stocké.
 * @param {string} candidatePassword - Mot de passe à vérifier
 * @returns {Promise<boolean>}
 */
userSchema.methods.matchPassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);