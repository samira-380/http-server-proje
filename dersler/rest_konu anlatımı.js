//REST Temelleri + Klasör Yapısı + .env

//REST( Representational State Transfer) istemci-sunucu arasında hızlı ve kolay şekilde iletişim kurulmasını sağlayan bir servis yapısıdır. REST, servis yönelimli mimari üzerine oluşturulan yazılımlarda kullanılan bir veri transfer yöntemidir. HTTP üzerinde çalışır ve diğer alternatiflere göre daha basittir, minimum içerikle veri alıp gönderdiği için de daha hızlıdır. İstemci ve sunucu arasında XML veya JSON verilerini taşıyarak uygulamaların haberleşmesini sağlar. REST standartlarına uygun yazılan web servislerine RESTful servisler denir.


//Bir REST API'de her şeyi bir kaynak olarak düşünürsün: bir kullanıcı, bir işlem (transaction), bir ürün. Her kaynağın bir adresi (URI) vardır
// /users          → tüm kullanıcılar
// /users/5        → id'si 5 olan kullanıcı
// /transactions   → tüm işlemler
// /transactions/12 → id'si 12 olan işlem

//Sonra bu kaynaklara ne yapmak istediğini HTTP method'u ile söylersin  --> GET /users/5 , DELETE /users/5

// REST'in 4 önemli prensibi 
// Stateless (durumsuz): Sunucu, senin önceki isteğini hatırlamaz. Her istek kendi başına yeterli bilgiyi taşımalı (örneğin token'ı her seferinde göndermen gerekir). Sunucu "bu adam az önce login oldu" diye bir hafıza tutmaz.
// Client-Server ayrımı: Frontend (client) ve backend (server) birbirinden bağımsızdır. Biri değişse diğeri bozulmamalı.
// Uniform Interface (tekdüze arayüz): Her kaynağa aynı mantıkla (URI + method) erişilir. Kullanıcılar için de, ürünler için de aynı kurallar geçerli.
// Kaynak Temsili (Representation): Sunucu sana veritabanındaki "ham veriyi" değil, onun bir temsilini (genelde JSON) gönderir.

//Idempotent ne demek? Aynı isteği 1 kere de atsan, 100 kere de atsan sonuç aynı olmalı.
// DELETE /transactions/12 → bir kere silersin, 100 kere de yollasan sonuç "kayıt yok" — idempotent.
// POST /transactions → her yolladığında yeni bir kayıt oluşur. 100 kere yollarsan 100 tane işlem oluşur — idempotent DEĞİL.

// GET-->Veri getirir, değiştirmez
// POST-->Yeni kayıt oluşturur
// PUT-->Kaydın tamamını değiştirir                       
// PATCH-->Kaydın bir kısmını değiştirir
// DELETE-->Kaydı siler

// PUT vs PATCH farkı 

// Diyelim transactions/12 kaydında şu alanlar var: { amount: 100, category: "yemek", date: "2026-01-01" }
// PUT ile güncelleme yaparken tüm objeyi göndermen gerekir. Eğer sadece { "amount": 150 } gönderirsen, PUT'un "doğru" davranışı diğer alanları silmek/sıfırlamaktır (çünkü PUT "bu kaynağın TAMAMINI bununla değiştir" demektir). PATCH ile sadece değişen alanı gönderirsin. Pratikte: Çoğu geliştirici PATCH'i tercih eder çünkü daha güvenlidir (kazara veri silme riski yok). PUT'u genelde "kaynağın tamamını yeniden oluşturuyorum" senaryolarında kullanırsın (örneğin bir dosyayı komple değiştirmek gibi).

// HTTP Status Code'ları:
// Grup              Anlamı
// 1xx               Bilgilendirme (nadiren kullanılır)
// 2xx               Başarılı
// 3xx               Yönlendirme (redirect)
// 4xx               İstemci hatası (senin gönderdiğin istek hatalı)
// 5xx               Sunucu hatası (backend'de bir şeyler patladı)

//     Code Anlamı                         Ne zaman
//     200  OK                     Başarılı GET, PUT, PATCH
//     201  Created                Başarılı POST (yeni kayıt oluştu)
//     204  No Content             Başarılı DELETE (geri dönecek veri yok)
//     400  Bad Request            İstemci eksik/hatalı veri gönderdi
//     401  Unauthorized           Giriş yapılmamış / token yok
//     403  Forbidden              Giriş yapılmış ama yetkisi yok
//     404  Not Found              Kaynak bulunamadı
//     409  Conflict               Çakışma (örn: aynı email ile ikinci kayıt)
//     422  Unprocessable Entity   Veri formatı doğru ama mantıksal hata (örn: negatif yaş)
//     500  Internal Server Error  Sunucu tarafında beklenmeyen hata

//401 vs 403 farkı çok karıştırılır: 401 "sen kimsin, tanımıyorum" (login yok), 403 "seni tanıyorum ama buraya giremezsin" (yetkin yok). Örnek: Normal kullanıcı admin paneline girmeye çalışırsa 403 alır, hiç login olmamış biri 401 alır.

// REST vs SOAP

//SOAP(Simple Access Protocol) en temel anlamda, internet üzerinden küçük miktarda bilgileri yada mesajları aktarma protokoludur. SOAP mesajları XML formatındadırlar ve genellikle HTTP(Hyper Text Transfer Protocol) protokolu(bazende TCP/IP) kullanılarak gönderilirler. SOAP ,XML tabanlı kullanıma mecbur bırakır. Bu konuda esnek değildir.

//SOAP ve REST, API tasarımına ilişkin iki farklı yaklaşımdır. SOAP yaklaşımı son derece yapılandırılmıştır ve XML veri biçimini kullanır. REST daha esnektir ve uygulamaların birden fazla biçimde veri alışverişi yapmasına olanak tanır. 

  // SOAP ve REST arasındaki benzerlikler şunlardır:

// İkisi de, uygulamaların diğer uygulamalardan gelen veri isteklerini nasıl oluşturduğuna, işlediğine ve bunlara nasıl yanıt verdiğine ilişkin kuralları ve standartları tanımlar
// İkisi de, bilgi alışverişi yapmak için standartlaştırılmış internet protokolü olan HTTP'yi kullanır
// İkisi de, güvenli ve şifrelenmiş iletişim için SSL/TLS'yi destekler

 //Rest ile Soap Farkı:

// Soap üzerinden güvenlik sağlamak daha kolayken, rest uygulamanın hızlı çalışmasını istiyorsak daha yararlı bir kaynaktır. rest json, xml ve text ile çalışabilirken soap sadece xml kullanır. Soap için daha fazla geliştirici araç vardır ve kullanırken daha çok yardımcı kaynağa ulaşabiliriz. REST mimarisi SOAP’a göre oldukça esnektir ve hafiftir, taşınan veri miktarı daha azdır, entegrasyonu da daha kolaydır.

//Postman — Body, Params, Query Farkları

// Query Params: URL'nin sonuna ? ile eklenir. Filtreleme, sıralama, sayfalama için kullanılır

// GET /transactions?type=income&sort=date&page=2
// -->Burada ?type=income demek: "bana sadece 'income' tipindeki işlemleri getir." Birden fazla parametre & ile birleştirilir. Bunlar veri oluşturmaz, sadece GET isteğini daraltır/şekillendirir.

// Route Params: URL'nin içine gömülü, belirli bir kaynağı işaret eder

// GET /transactions/12   → id=12 route parametresi. Bu, "hangi kaynak" sorusunun cevabıdır — filtreleme değil, doğrudan adresleme.

// Body: İstek gövdesi. Genelde JSON formatında, veri göndermek için kullanılır (POST, PUT, PATCH'te). Query'nin aksine URL'de görünmez, daha büyük/karmaşık veri taşıyabilir, ve şifre gibi hassas bilgiler için tercih edilir (URL'ler loglanır, tarayıcı geçmişinde kalır — body kalmaz).

// POST /transactions
// Body: { "amount": 250, "category": "market" }

// Veri filtrelemek/aramak için query, hangi kayıt sorusuna cevap için route param, yeni veri göndermek/güncellemek için body.


// .env Dosyası ve Ortam Değişkenleri:

// Kodun içine asla şunları doğrudan yazmamalısın: veritabanı şifreleri, API anahtarları, port numaraları gibi ortama göre değişebilecek veya gizli kalması gereken bilgiler. Bunun yerine .env dosyasına yazarsın, kod da bunu oradan okur. Node.js'te bunu okumak için dotenv paketi kullanılır.

// PORT=3000
// MONGO_URI=mongodb+srv://kullanici:sifre@cluster.mongodb.net/db
// JWT_SECRET=cok-gizli-bir-anahtar

// require('dotenv').config();
// const port = process.env.PORT;

// .env'i GitHub'a push edersen ne olur?

// Eğer .env dosyanı github'a push edersen:

// Repo public ise, herkes veritabanı şifreni görebilir.
// Repo private olsa bile, ileride public yaparsan veya birisi erişim kazanırsa şifre sızmış olur.
// Otomatik botlar sürekli GitHub'ı tarayıp açıkta kalmış API anahtarlarını arar — dakikalar içinde ele geçirilebilir (özellikle AWS/OpenAI anahtarları için bu çok yaygın bir saldırı).
// Git geçmişinden silmek de yetmez — bir kere commit edildiyse geçmişte kalır, "history rewrite" yapman gerekir.











