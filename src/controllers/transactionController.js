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
// GET /summary — toplam gelir, gider, bakiye, kategori bazlı harcama
const getSummary = async (req, res, next) => {
  try {
    const totals = await Transaction.aggregate([
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

    const categoryTotals = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;
    totals.forEach(t => {
      if (t._id === 'income') totalIncome = t.total;
      if (t._id === 'expense') totalExpense = t.total;
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryBreakdown: categoryTotals
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction, getSummary };