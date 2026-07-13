const Transaction = require('../models/Transaction');

// POST /transactions — yeni transaction oluştur
const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    const populated = await saved.populate('category');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// GET /transactions — tüm transaction'ları getir
const getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find()
      .populate('category')
      .skip(skip)
      .limit(limit);

    const totalCount = await Transaction.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      transactions,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /transactions/:id — tek transaction getir
const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('category');
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
    }).populate('category');
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
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      { $unwind: '$categoryInfo' },
      {
        $project: {
          _id: 0,
          categoryId: '$_id',
          categoryName: '$categoryInfo.name',
          total: 1,
          monthlyBudgetLimit: '$categoryInfo.monthlyBudgetLimit',
          isOverBudget: {
  $cond: {
    if: {
      $and: [
        { $gt: ['$categoryInfo.monthlyBudgetLimit', 0] },
        { $gt: ['$total', '$categoryInfo.monthlyBudgetLimit'] }
      ]
    },
    then: true,
    else: false
  }
}
        }
      }
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
// GET /transactions/export/csv — tüm transaction'ları CSV olarak indir
const exportTransactionsCSV = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate('category');

    // CSV başlık satırı
    let csv = 'Tutar,Tip,Kategori,Odeme Yontemi,Tarih\n';

    // Her transaction için bir satır ekle
    transactions.forEach((t) => {
      const row = [
        t.amount,
        t.type,
        t.category?.name || '',
        t.paymentMethod,
        new Date(t.date).toLocaleDateString('tr-TR')
      ].join(',');
      csv += row + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');
    res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
  exportTransactionsCSV
};