const Transaction = require('../models/Transaction');

// POST /transactions — yeni transaction oluştur
const createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
  }
};

// GET /transactions — tüm transaction'ları getir
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
  }
};

module.exports = { createTransaction, getTransactions };