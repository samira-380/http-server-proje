Gün 15 — Dashboard + Grafikler

chart.js ve react-chartjs-2 nedir?

Chart.js, tarayıcıda grafik çizmek için kullanılan popüler bir JavaScript kütüphanesi (canvas tabanlı çalışır — HTML5 <canvas> elementi üzerine çizim yapar).

react-chartjs-2, Chart.js'i React component'i olarak kullanmanı sağlayan bir "wrapper" (sarmalayıcı) kütüphane. Chart.js'in kendisi React'e özel değil, düz JavaScript ile çalışır; react-chartjs-2 bunu React'in <Pie />, <Line /> gibi component'lerine çevirir, böylece state ve prop'larla doğal şekilde kullanabilirsin.

useContext nedir? Ne işe yarar?

useContext, React bileşenleri (component) arasında verileri doğrudan paylaşmayı sağlayan ve "prop drilling" (verileri ara katmanlardan tek tek geçirme) sorununu çözen bir React kancasıdır.

useContext ne yapar? 

Bir veriyi "global" bir şekilde tanımlarsın (Context ile), ve ağacın herhangi bir derinliğindeki component, aradaki katmanları atlayarak doğrudan o veriye erişebilir:


Prop Drilling Neden Sorun Olur?

Bir veriyi, App.jsx'ten derinlerdeki bir component'e ulaştırmak için, aradaki her component'ten prop olarak geçirmen gerekir — bile o component'in o veriyle hiçbir ilgisi olmasa bile

Bakım Zorluğu: Bileşen ağacında bir değişiklik yapıldığında veya bir prop'un adı değiştirildiğinde, o zincirdeki tüm ara bileşenlerin güncellenmesi gerekir.

Kod Karmaşası (Boilerplate): Bileşenlerin asıl sorumlulukları dışına çıkıp sadece veri taşıyıcı (conduit) görevini görmelerine neden olur.

Yeniden Kullanılabilirliğin Azalması (Coupling): Ara bileşenler, kullanmadıkları verileri bekleyecek şekilde sıkı sıkıya bağlandığı için tek başlarına tekrar kullanılmaları zorlaşır.