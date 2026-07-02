//Callback ile yazılmış bir şeyi Promise ile yeniden yaz. Ne değişti?

function hello() {return new Promise((resolve) => {
setTimeout(function() {
console.log("Hello");
resolve(); }, 3000);});
}
function goodbye() {
console.log("goodbye");
}

hello().then(goodbye);

//uzun işlemlerde okuma kolaylığı vardır callback'e göre
// promise'de goodbye fonksiyonu, callback'te olduğu gibi hello fonksiyonuna parametre olarak verilmez. promise tamamlandıktan sonra .then() ile eklenir