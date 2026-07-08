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

DOMParseriyelim ki kullanıcı yanlışlıkla amount: 250 yazmış, aslında 300 olacaktı — bunu düzeltmek için bir yol lazım. İşte bu PUT'un işi: var olan bir kaydı güncellemek.

PUT /transactions/6a4bb8dee901350007dcd3b8
Body: { "amount": 300 }
Bu istek, "bu ID'ye sahip kaydı bul, amount'unu 300 yap" demek.


DELETE nedir
Bir kaydı tamamen silmek için kullanılır. Mantığı GET/PUT ile aynı — hangi kaydı sileceğini bilmek için yine :id kullanıyoruz.
DELETE /transactions/6a4bb8dee901350007dcd3b8