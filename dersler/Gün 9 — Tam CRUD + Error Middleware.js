Gün 9 — Tam CRUD + Error Middleware

route params:
router.post('/transactions', createTransaction);  yeni bir transaction oluştur
router.get('/transactions', getTransactions); tüm transaction'ları getir

Ama şimdi tek bir spesifik kaydı işaret etmen gerekiyor: "şu ID'ye sahip transaction'ı getir/güncelle/sil".
router.get('/transactions/:id', getTransactionById);
Burada :id bir placeholder (yer tutucu). Kullanıcı gerçek istekte şunu atar:

GET /transactions/6a4bb8dee901350007dcd3b8

Express, :id yazdığın yere gelen her şeyi yakalar ve req.params.id içine koyar:

const getTransactionById = async (req, res) => {
  console.log(req.params.id); // "6a4bb8dee901350007dcd3b8"
};