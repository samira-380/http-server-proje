Gün 11 — Vite + Component Yapısı

--React nedir, neden kullanıyoruz?
Şu ana kadar yazdığın backend (Express + MongoDB), veriyi saklayan ve dışarı veren taraf. Ama kullanıcı bu veriyi bir tarayıcıda görmek ve etkileşime girmek istiyor — form doldurmak, buton tıklamak, grafik görmek gibi. İşte bunu yapan katman frontend, ve React bunu inşa etmek için kullanılan bir kütüphane.
Normal HTML/CSS/JS ile de bir arayüz yapabilirdin, ama sayfa büyüdükçe (çok sayıda buton, form, liste, güncellenen veri) yönetmek kabusa dönüşür. React bu karmaşayı component dedikleri küçük, yönetilebilir parçalara bölerek çözüyor.

--Component nedir? — En temel kavram
Bir component, kendi başına yaşayabilen, tekrar kullanılabilir bir arayüz parçası. Bunu Lego bloğu gibi düşün.
Senin projende mesela:

Navbar → sayfanın üst menüsü (tek başına bir component)
TransactionForm → yeni işlem eklemek için form (başka bir component)
TransactionTable → işlemlerin listelendiği tablo (başka bir component)

--JSX nedir?
Normalde JavaScript içinde HTML yazamazsın — ikisi ayrı diller. Ama React, sana özel bir sözdizimi (syntax) sunuyor: JSX. Bu, JavaScript dosyası içinde HTML'e çok benzeyen kod yazmana izin veriyor:
jsxfunction Merhaba() {
  return <h1>Merhaba Dünya</h1>; // Bu HTML gibi görünüyor ama aslında JSX
}
Bu aslında arka planda normal JavaScript'e çevriliyor (tarayıcı bunu direkt anlamıyor, bir derleme aracı — Vite — bunu senin yerine çeviriyor). Ama sen kod yazarken sanki HTML yazıyormuşsun gibi hissediyorsun, bu da arayüz kodunu okumayı/yazmayı çok kolaylaştırıyor.

--useState nedir? — Component kendi verisini nasıl tutar
useState, fonksiyonel React bileşenlerinde (components) veri veya durum (state) tutmanızı ve bu durum değiştikçe ekranın güncellenmesini (render) sağlayan bir React özelliğidir

--Props nedir? — Component'e dışarıdan veri geçmek
Props, bileşenlere (component) dışarıdan veri aktarılmasını sağlayan ve "properties" (özellikler) kelimesinden türetilen bir yapıdır. React bileşenleri, birbirleriyle iletişim kurmak için prop’ları kullanır. Her üst eleman, alt elemanlarına prop’lar vererek onlarla bilgi paylaşabilir. Prop’lar, size HTML özelliklerini hatırlatabilir, ancak onların aracılığıyla nesneler, diziler ve fonksiyonlar da dahil olmak üzere herhangi bir JavaScript değeri aktarabilirsiniz.

                                 State                                   Props
Kim yönetir               Component'in kendisi                    Dışarıdan (ebeveyn) verilir
Değiştirilebilir mi       Evet, useState'in set fonksiyonuyla     Hayır, component onu sadece okur, değiştiremez
Benzetme                  Component'in kendi hafızası, kendi düşünceleri    Component'e verilen bir talimat/mektup


--Virtual DOM nedir?

DOM (Document Object Model), tarayıcının sayfayı temsil eden gerçek yapısı — HTML elemanlarının ağaç şeklinde tutulduğu yer. Gerçek DOM'u her değiştirdiğinde (bir elementi güncellediğinde), tarayıcı bunu yeniden çizmek zorunda kalır — bu yavaş bir işlem.

Virtual DOM, React'ın hafızasında tuttuğu, gerçek DOM'un hafif bir kopyası. React, bir şey değiştiğinde önce bu sanal kopyada değişikliği yapar, eski hali ile yeni hali karşılaştırır (buna "diffing" denir), ve sadece gerçekten değişen kısmı gerçek DOM'a yansıtır.

React neden tüm sayfayı yeniden render etmiyor?

Çünkü Virtual DOM sayesinde React, "hangi kısım gerçekten değişti?" sorusunu cevaplayabiliyor. Diyelim TransactionForm'da bir input değişti ama Navbar hiç değişmedi — React, sadece TransactionForm'un ilgili küçük parçasını günceller, Navbar'a hiç dokunmaz. Bu, performans açısından çok büyük bir avantaj — özellikle büyük, karmaşık sayfalarda tüm DOM'u sürekli yeniden çizmek çok yavaş ve gereksiz olurdu.