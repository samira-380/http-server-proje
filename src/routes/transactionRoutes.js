const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions } = require('../controllers/transactionController');

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);

module.exports = router;