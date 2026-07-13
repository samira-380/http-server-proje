const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction, getSummary, exportTransactionsCSV } = require('../controllers/transactionController');

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.get('/summary', getSummary);
router.get('/transactions/export/csv', exportTransactionsCSV);
router.get('/transactions/:id', getTransactionById);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;