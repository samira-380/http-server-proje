Gün 16 — Bütçe Limiti + CSV Export

Yapmak istediğimiz: "Yemek kategorisinde 2000 TL limit varmış, ama sen bu ay 2200 TL harcamışsın — dikkat!" gibi bir uyarı göstermek.

İki veriyi karşılaştırıp kullanıcıya uyarı gösterme mantığı hem frontend hem de backend'de farklı amaçlarla bulunmalıdır. Ancak asıl kritik iş kuralı doğrulaması backend'de olmalıdır.

İdeal bir sistemde sorumlulukların dağılımı şu şekildedir:

1. Frontend (İstemci): Kullanıcı Deneyimi ve HızFrontend'deki doğrulama, kullanıcıya anlık geri bildirim vermek ve gereksiz ağ trafiğini engellemek içindir.

Neden burada olmalı? Sayfa yenilenmesine gerek kalmadan kullanıcıyı uyararak (örneğin: şifrelerin eşleşmemesi, tarih çakışmaları) formu daha hızlı ve akıcı hale getirir.

Örnek: MDN Web Docs standartlarına göre form validasyonları yapılarak kullanıcıya anında kırmızı hata mesajları gösterilebilir.

2. Backend (Sunucu): Güvenlik ve Veri Bütünlüğü Backend'deki doğrulama ise asıl iş kuralını (business logic) uygulayan ve sistemi koruyan katmandır.

Neden burada olmalı? Frontend'deki kontroller her zaman manipüle edilebilir (kullanıcı tarayıcıda JavaScript'i kapatabilir veya API isteklerine müdahale edebilir). Veri tabanına hatalı veya kötü niyetli verinin girmesini engellemek için karşılaştırma mutlaka sunucu tarafında da yapılmalıdır.

Örnek: OWASP güvenlik yönergelerine göre, hassas veri doğrulama ve karşılaştırmalar her halükarda backend API'sinde tekrar edilmelidir.

Özetle;
Frontend: Kullanıcı dostu bir arayüz için uyarıcı (UX) rolündedir.
Backend: Güvenli ve tutarlı bir sistem için zorunlu (Security/Logic) katmandır.

Veri karşılaştırma mantığını sadece frontend'e koymak büyük bir güvenlik ve veri tutarsızlığı açığına yol açar. En güvenli yaklaşım, ön tarafta kullanıcıyı hızlandırmak için uyarı göstermek, arka tarafta ise işlemi kaydetmeden önce kuralları tekrar kontrol edip hata fırlatmaktır.

CSV Export — bu ne, neden istiyoruz?

CSV dosyası, virgülle ayrılmış değerler anlamına gelen bir kısaltmadır ve veri depolama ve aktarımını basitleştiren düz metin formatıdır. CSV dosyası, her satırın bir kaydı temsil ettiği ve her sütunun virgülle ayrıldığı tablo formatında verileri depolar. Kolayca tanınabilen .csv dosya uzantısı bu dosya türünü belirtir. Dosyanın yapısı, sistemler arasında sorunsuz veri aktarımına olanak tanır ve çok çeşitli yazılım araçlarıyla uyumluluğu sağlar. 

CSV dosyaları yalnızca elektronik tablo programlarına özgü olmasa da, Microsoft Excel, Google Sheets ve diğerleri gibi popüler araçlarla sorunsuz bir şekilde entegre olurlar. Çeşitli yazılım ortamlarına uyum sağlama yetenekleri, onları değerli bir araç haline getirir.

Veri alışverişi:
CSV dosyaları, özellikle özel formatlar kullanmayan uygulamalar arasında veri aktarımını kolaylaştırır. Bu uyarlanabilirlik, birçok geliştirici ve analistin onları tercih etmesinin nedenidir.

Veri analizi:
Ham verileri elektronik tablo yazılımına aktarmak, verilerin okunmasını ve daha detaylı analizini kolaylaştırır.

Veritabanı yönetimi:
CSV dosyalarının sade yapısı, veritabanı yüklemelerini, kayıt dışa aktarımlarını ve genel bakımı kolaylaştırır.


CSV neden hâlâ bu kadar yaygın — JSON'a kıyasla avantajı ne?

JSON, API'ler ve web servisleri üzerinden veri alışverişi (data interchange) yapmak için altından kalkılamaz bir standarttır. Ancak finans, pazarlama, makine öğrenimi ve veri bilimi gibi alanlarda karmaşık iç içe objelere (nested objects) nadiren ihtiyaç duyulur. Veriler zaten geleneksel satır/sütun mantığına uygun olduğu için, CSV onlarca yıldır koruduğu pratikliğiyle hâlâ birincil tercih konumundadır. Ama "düz tablo, insan okusun, Excel'de açsın" senaryosunda CSV kazanır.

Content-Type ve Content-Disposition header'ları. 
 
 Content-Type: Verinin gövdesinde (body) bulunan kaynağın türünü ve biçimini tanımlayan standart MIME (Multipurpose Internet Mail Extensions) türüdür. Sunucunun veya tarayıcının veriyi nasıl yorumlaması gerektiğini belirler.

 Content-Disposition: Verinin yerel bir dosyaya kaydedilmesi mi, yoksa tarayıcı penceresinde doğrudan gösterilmesi mi gerektiğini belirten bir yanıt başlığıdır. Dosya indirmelerinde (download) dosya adı tanımlamak için sıklıkla kullanılır.

 Content-Disposition: attachment; filename="transactions.csv" --attachment kelimesi kritik — bu olmadan (inline olsaydı ya da hiç header olmasaydı), tarayıcı CSV içeriğini sayfada düz metin olarak göstermeye çalışabilirdi, indirme penceresi çıkmazdı.

 