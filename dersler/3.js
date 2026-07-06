// map, filter, find, forEach — her birinin bir işlem listesi üzerinde ne yaptığını göster.

//önce bir array tanımlıyorum.
const ülkeler=[
    {isim: "Türkiye",parabirimi:"tl",numara:1},
    {isim: "ABD",parabirimi:"dolar",numara:2},
    {isim: "Almanya",parabirimi:"euro",numara:3},
    {isim: "Kanada",parabirimi:"dolar",numara:4},
    {isim: "İsviçre",parabirimi:"isviçre frangı",numara:5}
]

//map: Her dizi elemanı için bir fonksiyon çağırarak yeni bir dizi oluşturur
const ülke_isimleri= ülkeler.map(ülke=>ülke.isim);

console.log(ülke_isimleri);

//filter: istenilen şarta uyan elemanlardan yeni bir dizi oluşturur

const para_birimi= ülkeler.filter(para=>para.parabirimi==="dolar")
console.log(para_birimi);

//find: aradığım şarta uygun ilk nesneyi bulur

const numarası_1_olan= ülkeler.find(num=> num.numara===1);
console.log(numarası_1_olan);

//foreach:  dizideki her bir eleman için bir fonksiyon çağırır. retrun mantığı yoktur.

ülkeler.forEach(ülke => {console.log(`ülke: ${ülke.isim}`);
});

