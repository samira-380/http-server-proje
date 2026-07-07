// Gün 8 — POST + GET + Validation

// POST ve GET tam olarak ne yapıyor?

// Şu ana kadar sadece veritabanına elle (testTransaction.js ile) bir kayıt attık. Ama gerçek bir uygulamada, kullanıcı (ya da frontend) senin API'na bir istek gönderir, senin API'ın da o isteğe göre bir şey yapar.

// GET /transactions → "Bana tüm transaction'ları getir" isteği. Veri okunuyor, hiçbir şey değişmiyor.
// POST /transactions → "Yeni bir transaction oluştur" isteği. Kullanıcı sana bir body (JSON veri) gönderir, sen onu alıp veritabanına yazıyorsun

// Bir transaction'ın geçerli sayılması için hangi kurallar gerekli? Kendi listeni çıkar.
// Bu alan olmadan kayıt anlamsız mı? → zorunlu yap
// Bu alanın değeri sınırlı, bilinen seçeneklerden mi oluşuyor? → enum kullan
// Mantıksal bir sınır var mı (negatif olamaz gibi)? → min/max koy
// Kullanıcı çoğu zaman aynı değeri girecek mi? → default ile kolaylaştır

// --Validation nedir, neden gerekli?

// Validation = "gelen veri güvenilir mi, mantıklı mı, doğru formatta mı?" kontrolü — veritabanına yazmadan önce yapılır.

// Neden gerekli? Çünkü API'na istek atan kişi (kullanıcı, bozuk bir frontend, kötü niyetli biri) sana her şeyi gönderebilir:

// { "amount": "elli lira", "type": "belkiGelirdir" }

// Validation nerede yapılır — Schema'da mı, Controller'da mı? ikisi de mümkün, ama farklı işler görürler

// Schema validation → "veritabanına asla bozuk veri girmesin" garantisi (son kale)
// Controller validation → kullanıcıya daha net, daha hızlı, daha kontrollü hata mesajı verme imkanı (ön kapı)

// Schema, hatalı veri geldiğinde Mongoose'un kendi hata formatını döner (biraz karmaşık, teknik bir hata objesi). Controller'da kendi kontrolünü yazarsan, kullanıcıya "amount alanı zorunludur" gibi senin belirlediğin, temiz bir mesaj dönebilirsin.

// --400 Bad Request vs 422 Unprocessable Entity

// İkisi de "senin gönderdiğin bir şey yanlış" anlamına gelir ama ince bir fark var:

// 400 Bad Request → İstek formatının kendisi bozuk. Mesela JSON olması gereken body, JSON değil; ya da hiç body gönderilmemiş; ya da URL yanlış.
// 422 Unprocessable Entity → İsteğin formatı (JSON) doğru, sunucu isteği anladı, ama içindeki veri kurallara uymuyor. Mesela JSON doğru geldi ama amount alanı eksik ya da type enum'da olmayan bir değer

