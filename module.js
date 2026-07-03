//  Node.js Modül Sistemi
// require ile bir dosyayı başka bir dosyaya nasıl dahil edersin?
// module.exports ne işe yarar?
// Node.js built-in modüller nedir? fs ve path ne yapar?
// npm init ne oluşturur? package.json içindeki her alanın ne anlama geldiğini oku.
// npm install ile kurduğun bir paket nereye gider?


//Node.js'in kendi orijinal sistemi. require() ile modül alırsın, module.exports ile modül dışa aktarırsın.

let call= function(){
console.log("hello! this is call function!");}


module.exports.method= call;

//fs: Bilgisayarındaki dosyaları okumak, yazmak, silmek, klasör oluşturmak gibi işlemler için kullanılır.
const fs = require('fs');

fs.readFile('1.js', 'utf8', (hata, veri) => {
  if (hata) {
    console.error('Hata oluştu:', hata);
    return;
  }
  console.log(veri);
});

console.log('okuma işlemi tamamlandı');


fs.writeFile('yeni.js', 'merhaba', (hata) => {
  if (hata) throw hata;
  console.log('Dosya yazıldı');
});

fs.appendFile('yeni.js', 'samira\n', (hata) => {
  if (hata) throw hata;
});


fs.mkdir('yeniKlasor', (hata) => {});       // klasör oluşturma
fs.unlink('silinecek.txt', (hata) => {});   // dosya silme
fs.readdir('.', (hata, dosyalar) => {});    // klasördeki dosyaları listeleme

//path: Farklı işletim sistemlerinde dosya yolları farklı yazılır (Windows'ta \, Mac/Linux'ta /). path modülü bu farkı senin yerine hallederek yol birleştirme/ayrıştırma işlerini yapar.

const path = require('path');
const yol=path.join('kullanıcı','samira','dosya1.js')
console.log(yol);

// Dosya adını alma
console.log(path.basename('/klasor/rapor.pdf'));

// Uzantıyı alma
console.log(path.extname('rapor.pdf'));

// Klasör yolunu alma
console.log(path.dirname('/klasor/alt/rapor.pdf')); 

//__dirname Node.js'te otomatik tanımlı bir değişkendir ve o anki dosyanın bulunduğu klasörün tam yolunu verir. path.join ile bunu diğer klasör/dosya adlarıyla birleştirebilirsin — böylece kod hangi bilgisayarda çalışırsa çalışsın doğru yolu bulur.

const yol2 = path.join(__dirname, 'veriler', 'kullanicilar.json');

// npm init komutunu çalıştırdığında, proje klasöründe bir package.json dosyası oluşturur. Bu dosya projenin "kimlik kartı" gibidir — projenin adı, versiyonu, hangi paketlere ihtiyaç duyduğu gibi bilgileri tutar. İndirdiğimiz paketler otomatik olarak node_modules adındaki klasöre kaydediliyor. npm install express

fs.readFile('package.json', 'utf8', (hata, veri) => {
  if (hata) {
    console.error('Hata oluştu:', hata);
    return;
  }

  // veri şu an bir string, JSON objesine çevir
  const obje = JSON.parse(veri);

  console.log('İsim:', obje.name);
  console.log('Versiyon:', obje.version);
});

// require ile ES6 import arasındaki fark ne?
//require, kod satır satır çalışırken, o satıra geldiği an modülü yükler. İstersen koşullu bile yapabilirsin, import ifadeleri kod çalışmadan önce taranır ve modül bağlantıları önceden kurulur. Bu yüzden koşullu kullanamazsın.

//node_modules klasörü neden .gitignore'a eklenir?
//node_modules klasörü, projenize yüklediğiniz kütüphaneleri ve o kütüphanelerin çalışmak için ihtiyaç duyduğu diğer alt kütüphaneleri (bağımlılıkları) içerir. Küçük bir projede bile bu klasörün boyutu yüzlerce megabayta (MB) ve on binlerce küçük dosyaya ulaşabilir. Bu kadar büyük bir klasörü Git ile takip etmek ve GitHub/GitLab gibi platformlara yüklemeye çalışmak (push/pull işlemleri) hem çok uzun sürer hem de internet kotanızı ve disk alanınızı gereksiz yere harcanır
