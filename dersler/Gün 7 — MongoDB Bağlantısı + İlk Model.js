Gün 7 — MongoDB Bağlantısı + İlk Model
Veri, JSON'a çok benzeyen BSON (Binary JSON) formatında dokümanlar halinde tutulur:

{
  "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
  "name": "Market",
  "amount": 250,
  "category": "yemek",
  "tags": ["gıda", "haftalık"]
}

SQL          MongoDB
Database     Database
Table        Collection 
Row          Document 
Column       Field  
Primary Key  _id (otomatik oluşturulur)

Dokümanlar collection (koleksiyon) içinde gruplanır — SQL'deki "tablo" kavramının gevşek karşılığı diyebilirsin, ama fark şu: aynı collection içindeki iki doküman farklı alanlara sahip olabilir. Biri tags alanına sahipken diğeri sahip olmayabilir — MongoDB buna izin verir (esneklik bu noktada devreye giriyor).

//NoSQL Neden Bu Adı Alıyor? (Görselde "araştır" denmiş)

"Not Only SQL" (sadece SQL değil) anlamına gelir. Temel farklar:

                       İlişkisel (SQL)                       MongoDB (NoSQL)
Şema             Katı, önceden tanımlı                Esnek, doküman bazında değişebilir
İlişkiler        JOIN ile tablolar  birleştirilir     Genelde veriyi iç içe (nested) gömersin,
Ölçeklenme       Genelde dikey                        Yatay ölçeklenmeye çok uygun 
Kullanım alanı   kesin tutarlılık gerektiren yerler   esnek veri yapıları, büyük ölçekli web uygulamaları
Sorgu dili       SQL                                  MongoDB kendi sorgu API'sini kullanır (JavaScript'e benzer)

Mongoose Nedir?

Mongoose, Node.js'ten MongoDB'ye konuşmak için kullanılan bir ODM (Object Document Mapper) kütüphanesidir.

Mongoose olmadan MongoDB'ye bağlanmak mümkün mü? Evet, mümkün. MongoDB'nin resmi Node.js sürücüsü (mongodb paketi) ile doğrudan bağlanabilirsin

const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db('proje');
const collection = db.collection('transactions');

Bunun Mongoose'a göre farkı: şema/validasyon katmanı yok. Yani hangi alanların zorunlu olduğunu, veri tipini vs. sen manuel kontrol etmen gerekir. Mongoose bunu otomatikleştirir.

Şema (Schema) Nedir?
Mongoose'da bir schema, bir dokümanın nasıl görünmesi gerektiğini tanımlayan bir şablondur: hangi alanlar var, veri tipleri ne, zorunlu mu, varsayılan değeri var mı gibi.

MongoDB'nin kendisi esnek olsa da (şemasız çalışabilir), uygulamanda her transaction'ın belirli bir yapıya uyması işini kolaylaştırır — yoksa "bazı kayıtlarda amount var, bazılarında yok" gibi bir kaosla uğraşırsın.