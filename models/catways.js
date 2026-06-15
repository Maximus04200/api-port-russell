const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro est obligatoire'],
    unique: true
  },
  catwayType: {
    type: String,
    required: true,
    enum: ['long', 'short']
  },
  catwayState: {
    type: String,
    required: [true, "L'état est obligatoire"],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Catway', catwaySchema);