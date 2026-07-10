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

Düşün: next(err) ile res.status(500).json(...) arasındaki fark ne?

const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Bir hata oluştu' }); // ❌
  }
}; Burada controller, hatayı kendi başına yakalayıp kendi başına cevap üretiyor ve işi bitiriyor.




const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err); // ✅
  }
};burada controller hatayaı alıp  errorMiddleware.js dosyasına gönderir.

next() ve next(err) aynı fonksiyon ama farklı anlam taşıyor: next() boş çağrıldığında Express'e "bu adımda sorun yok, sıradaki middleware'e veya route'a geç" der ve normal akış devam eder; next(err) ise içine bir hata objesi verildiğinde Express bunu otomatik olarak hata sinyali olarak algılar, normal middleware zincirini bırakır ve doğrudan (err, req, res, next) şeklinde 4 parametreli olan özel hata middleware'in atlar — böylece tüm controller'lardaki hatalar dağınık res.status(500) yazmak yerine tek bir merkezi yerden, tutarlı bir formatta yönetilebilir.

HTTP 404 ile 500 arasındaki fark neden önemli?

500, sunucu tarafında beklenmeyen bir şeyin patladığını söyler. Kullanıcı hiçbir yanlış yapmamış olabilir. Örneğin:

MongoDB bağlantısı aniden koptu
Kodda beklenmeyen bir undefined.property hatası (bug) oluştu
Sunucu diskinin dolması gibi altyapısal bir sorun

404, isteği yapan tarafın (kullanıcının/frontend'in) yanlış veya artık geçerli olmayan bir şey istediğini söyler. Sunucu tamamen sağlıklı çalışıyor, sadece istenen kayıt yok. Örneğin:

Silinmiş bir transaction ID'si ile GET /api/transactions/665f... istersen
Hiç var olmamış bir kategori ID'si girersen.

Bir API'ı kullanan başka bir geliştirici her endpoint'ten farklı formatta hata alırsa ne yaşar?

Farklı endpoint'lerden farklı formatta hata gelirse, geliştirici her endpoint için ayrı ayrı "hata mesajı acaba nerede yazıyor?" diye kontrol etmek zorunda kalır. Bazen error, bazen message, bazen başka bir yerde olabilir.
Bu da demek: tek bir ortak kod yazamaz, her API çağrısı için ayrı özel kod yazmak zorunda kalır. Yorucu, hataya açık ve zaman kaybettirici.