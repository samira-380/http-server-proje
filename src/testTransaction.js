const mongoose = require('mongoose');
require('dotenv').config();
const Transaction = require('./models/Transaction');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB bağlantısı başarılı ✅');

    const testTransaction = new Transaction({
      userId: new mongoose.Types.ObjectId(),
      amount: 250,
      category: 'yemek',
      type: 'expense',
      description: 'test kaydı'
    });

    const saved = await testTransaction.save();
    console.log('Kaydedildi:', saved);

    mongoose.connection.close();
  })
  .catch((err) => console.error('Hata:', err));