const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'İşlemin bir kullanıcıya ait olması zorunludur.']
  },
  amount: {
    type: Number,
    required: [true, 'İşlem tutarı girilmesi zorunludur.'],
    min: [0.01, 'İşlem tutarı 0\'dan büyük olmalıdır.']
  },
  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  required: [true, 'Kategori seçimi zorunludur.']
},
  type: {
    type: String,
    enum: {
      values: ['income', 'expense'],
      message: '{VALUE} geçerli bir işlem tipi değil. Sadece "income" veya "expense" olabilir.'
    },
    required: [true, 'İşlem tipi (gelir/gider) zorunludur.']
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ['cash', 'credit_card', 'bank_transfer'],
      message: '{VALUE} geçerli bir ödeme yöntemi değil.'
    },
    required: [true, 'Ödeme yöntemi seçilmesi zorunludur.'],
    default: 'cash'
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePeriod: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
    default: 'none'
  },
  currency: {
    type: String,
    enum: ['TRY', 'USD', 'EUR'],
    default: 'TRY'
  },
  tags: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'cancelled'],
    default: 'completed'
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [255, 'Açıklama en fazla 255 karakter olabilir.']
  },
  date: {
    type: Date,
    required: [true, 'İşlem tarihi zorunludur.'],
    default: Date.now
  }
}, {
  timestamps: true // Otomatik createdAt ve updatedAt alanlarını ekler
});

transactionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);