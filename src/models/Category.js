const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Kategori adı zorunludur.'],
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Kategori rengi zorunludur.'],
    default: '#CCCCCC'
  },
  monthlyBudgetLimit: {
    type: Number,
    min: [0, 'Bütçe limiti negatif olamaz.'],
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);