const Transaction = require('../models/Transaction');

// POST /transactions — yeni transaction oluştur
const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// GET /transactions — tüm transaction'ları getir
const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

// GET /transactions/:id — tek transaction getir
const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      const error = new Error('Transaction bulunamadı');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

// PUT /transactions/:id — transaction güncelle
const updateTransaction = async (req, res, next) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      const error = new Error('Transaction bulunamadı');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /transactions/:id — transaction sil
const deleteTransaction = async (req, res, next) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error('Transaction bulunamadı');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: 'Transaction silindi', deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction };