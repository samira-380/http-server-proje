Gün 14 — Filtreler + Silme
Filtreleme nerede yapılmalı: Frontend mi, Backend mi?

Frontend'de filtreleme (client-side):
Tüm veriyi (örneğin tüm transaction'ları) bir kere backend'den çekersin, sonra JavaScript'in .filter() metoduyla tarayıcıda süzersin:

const filtered = transactions.filter(t => t.category === selectedCategory);

Backend'de filtreleme (server-side):
Filtre değiştiğinde backend'e "sadece şu kategoriye ait olanları getir" diye yeni bir istek atarsın:

GET /api/transactions?category=64f1a2...&startDate=2026-01-01

Backend, MongoDB sorgusunda find({ category: ..., date: {...} }) ile sadece uygun kayıtları döndürür.


Küçük veri seti (birkaç yüz kayıt): Frontend'de filtrele-Zaten tüm veri elde, tekrar network isteği atmaya gerek yok. Anlık, hızlı, sunucuya yük yok

Büyük veri seti (binlerce/milyonlarca kayıt): Backend'de filtrele-Tüm veriyi tarayıcıya çekmek hem yavaş hem gereksiz bellek kullanımı olur. Sunucu, veritabanı indexleriyle çok daha hızlı filtreler.

Filtre değiştiğinde kaç API çağrısı gidiyor?

Bu sorunun kesin bir sayısı yoktur; tamamen kullandığınız uygulamanın mimarisine ve yazılım tasarımına bağlıdır.Filtre değişiminde genellikle şu 3 senaryodan biri gerçekleşir:

1 İstek (Önerilen Yöntem): Tüm filtreler tek bir API isteğinde URL parametresi olarak (örn. /urunler?renk=kirmizi&beden=M) gönderilir ve tek seferde yanıt alınır.

Çoklu İstek: Eğer her bir filtrenin kendi bağımsız veri kaynağı veya alt kategorisi varsa, seçilen her filtre için ayrı bir API çağrısı tetiklenir (Örneğin; renk filtresi için 1, fiyat aralığı için ayrı 1 istek).

0 İstek (İstemci Tabanlı): Tüm ürün verileri daha önce tek seferde çekilmişse, API'ye hiç istek gitmez. Filtreleme işlemi doğrudan tarayıcı veya mobil cihaz (istemci) üzerinde yapılı

-useMemo ve useCallback nedir?

useMemo: Bir hesaplamanın sonucunu "hatırlar" (memoize eder), sadece bağımlılıkları değişirse yeniden hesaplar.

useCallback: Bir fonksiyonun kendisini "hatırlar", component her render olduğunda fonksiyonun yeniden oluşturulmasını (yeni bir referans almasını) engeller.

useMemo ve useCallback arasındaki temel fark şudur: useMemo bir fonksiyonun ürettiği değeri, useCallback ise doğrudan fonksiyonun kendisini (referansını) önbelleğe alır

4. Optimistic UI nedir?
Bu kavram, kullanıcı deneyimini hızlandırmak için kullanılır. Normal akış şöyledir:

Kullanıcı bir aksiyon yapar (örn. "Sil" butonuna basar)
Backend'e istek gider
Backend cevap verir (silme başarılı)
Ancak o zaman UI güncellenir (satır listeden kaldırılır)

Bu akışta, adım 2-3 arasında (network gecikmesi kadar, belki 100-500ms) kullanıcı hiçbir şey görmez, sanki tıklaması işe yaramamış gibi hisseder.
Optimistic UI bunun tersini yapar: Backend'den cevap gelmeden önce, UI'ı hemen güncellersin — "muhtemelen başarılı olacak" varsayımıyla:

Kullanıcı "Sil" butonuna basar
UI hemen güncellenir (satır anında listeden kaybolur)
Arka planda backend'e istek gider
Eğer backend hata dönerse, değişikliği geri alırsın (satırı tekrar eklersin) ve kullanıcıya hata gösterirsin

Bu, uygulamanın "anlık, hızlı" hissettirmesini sağlar. Riski şu: nadiren de olsa backend hata dönerse, kısa süreliğine kullanıcı yanlış bir durum görmüş olur (ama sonra düzeltilir).

window.confirm nedir?

Tarayıcının yerleşik (built-in) bir fonksiyonu — bir onay penceresi açar, kullanıcı "Tamam" ya da "İptal"e basar.