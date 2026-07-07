const mongoose = require('mongoose');
require('dotenv').config();
const Transaction = require('./models/Transaction');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB bağlantısı başarılı ✅');

    // Yeni şemadaki tüm zorunlu (required) ve opsiyonel alanları test ediyoruz
    const testTransaction = new Transaction({
      userId: new mongoose.Types.ObjectId(), // Geçici rastgele kullanıcı ID'si
      amount: 250.75,                        // Tutar 
      category: 'Yemek',                     // Kategori
      type: 'expense',                       // İşlem tipi 
      paymentMethod: 'credit_card',          // Ödeme yöntemi 
      isRecurring: false,                    // Tekrarlayan işlem mi?
      recurrencePeriod: 'none',              // Tekrarlama periyodu
      currency: 'TRY',                       // Para birimi
      tags: ['restoran', 'haftasonu'],        // Etiketler
      status: 'completed',                   // İşlem durumu
      description: 'Yeni şema mimarisi ile ilk test kaydı', 
      date: new Date()                     
    });

    try {
      const saved = await testTransaction.save();
      console.log('🚀 Veri MongoDB Atlas\'a başarıyla kaydedildi!:', saved);
    } catch (validationError) {
      console.error('❌ Şema doğrulama hatası:', validationError.message);
    } finally {
     
      mongoose.connection.close();
      console.log('MongoDB bağlantısı kapatıldı. 🔌');
    }
  })
  .catch((err) => console.error('Bağlantı Hatası ❌:', err));