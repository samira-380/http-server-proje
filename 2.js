// Klasik fonksiyon ile arrow function arasındaki fark ne zaman önemli olur? İkisini de yaz.

//1. klasik fonksiyonda fonksiyonu, daha fonsiyonu tanımlamadan çağırabiliyorken arrow function'da bunu yaparsak hata alırız.

let name="samira";

console.log(selamla(name)) //fonksiyondan önce  çağırdık

function selamla(a){
    return "selam"+" "+ a;
}

let name2= "samiraa" 
const selamla2=a=> 'selam'+' '+ a;
console.log(selamla2(name2))

//2.klasik fonksiyonlarda kaç tane parametre olursa olsun arguments nesnesiyle istediğimiz parametreye erişebiliriz ama bunu arrow fonksiyonda yapamayız.

function nesneler(){
    console.log(arguments);  //içindeki nesenleri görebiliriz
    console.log(arguments[2]); //3. nesneyi görürüz
}
nesneler("türkiye",58,"samira",85)

//3.klasik fonksiyonlar this kullanarak nesnenin kendi özelliklerine erişebilirken arrow fonksiyonlar buna sahip olmadıkları için nesne özelliklerine erişemezler.

const stajyer={
    isim:"Samira",
    soyad:"Yıldız",
    yas:22,

cagir: function(){
    return "stajyerin adı: "+this.isim+' '+this.soyad+ " ve yaşı: "+this.yas; 
}
};

console.log(stajyer.cagir())