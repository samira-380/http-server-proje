Gün 12 — API'dan Veri Çekme

--useEffect nedir?
Hatırlarsan useState, component'in kendi verisini tutmasını sağlıyordu. useEffect ise component'in "bir şey olduğunda otomatik bir işlem yap" demesini sağlıyor — özellikle "component ekrana ilk geldiğinde" senaryosu için.
useEffect fonksiyonu, birinci parametre olarak bir fonksiyon alır ve bu fonksiyon, component’in mount veya update durumlarında çalıştırılır. İkinci parametre olarak bir dizi alır ve bu dizi, useEffect fonksiyonunun hangi state veya props değişikliklerinde çalışacağını belirler. Bu dizi belirtilmezse, useEffect her state veya props değiştiğinde çalıştırılır.

--Dependency array ([]) ne işe yarıyor?

useEffect(() => {
  // bu kod çalışır
}, []); // ← bu boş dizi 

Boş dizi [] → "Sadece component ilk kez ekrana geldiğinde bir kere çalış, sonra bir daha hiç çalışma." Tam olarak bizim istediğimiz şey — sayfa açılınca bir kere veri çek, yeter. Dizi hiç olmasaydı (parametreyi tamamen kaldırsaydık) → Efekt, component her yeniden render olduğunda tekrar tekrar çalışırdı. Bu genelde istenmeyen bir durum — mesela her state değişiminde tekrar tekrar API'ya istek atardı, bu hem gereksiz hem de sonsuz döngüye bile yol açabilir.

Dizi içinde bir değişken olsaydı (örn. [userId]) → "Sadece userId değiştiğinde tekrar çalış" demek olurdu.

--Neden useEffect(async () => {...}, []) çalışmıyor?

async bir fonksiyon her zaman otomatik olarak bir Promise döndürür — React bunu görünce kafası karışır, beklenmeyen davranışlara ve uyarılara yol açar. useEffect hook'u doğrudan async bir fonksiyonu kabul etmez. async fonksiyonlar geriye bir Promise döner, ancak useEffect sadece geriye hiçbir şey döndürmeyen (veya bileşen ekrandan kaldırıldığında çalışacak bir temizleme fonksiyonu döndüren) senkron bir yapı bekler

--fetch nedir, nasıl çalışır?
Fetch, web tarayıcılarında sunuculardan asenkron olarak veri (JSON, metin, HTML vb.) alıp göndermeyi sağlayan modern bir JavaScript fonksiyonudur. Sayfayı tamamen yenilemeye gerek kalmadan sunucuyla iletişime geçilmesine imkan tanır. Promise (söz) yapısını kullandığı için arka planda çalışarak kullanıcı deneyimini kesintiye uğratmaz

const response = await fetch('http://localhost:5000/api/transactions'); // isteği atar ve cevabı bekler
const data = await response.json(); // gelen cevabı JSON formatına çevirir (senin Express API'ın zaten JSON döndürüyor, hatırlarsan res.json(...) ile)

--fetch başarısız olunca ne olur?

1- Resolved: İşlemin tamamlandığını belirtir. İstek tamamlandıysa resolved olmuştur.
2- Rejected: İşlem reddedilmiştir. Hata oluşmuştur(Network error, Cors error vb.)
3- Pending: İşlem henüz tamamlanmamıştır.

Fetch api kullanırken birden farklı hata ile karşılaşabiliriz. Bunlar sunucu taraflı hatalar (5xx), not found(404), network hataları ya da cors hataları olabilir. Fetch api promise tabanlı olduğu için, resolved,rejected,pending durumlarını yönetirken then,catch,finally keywordlerini tam anlamıyla kullanmamızı sağlar.

const response = await fetch('http://localhost:5000/api/transactions');

if (!response.ok) {
  throw new Error('Veri çekilemedi');
}

const data = await response.json();

response.ok, HTTP status kodu 200-299 arasındaysa true olur. Eğer backend'in 404 ya da 500 dönerse, response.ok false olur ama fetch kendisi hata fırlatmaz — bunu sen elle kontrol etmek zorundasın. Bu yüzden try/catch ile birlikte bu kontrolü de eklemek şart.
