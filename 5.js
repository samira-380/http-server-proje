//Bir fonksiyona başka bir fonksiyon parametre olarak geçirmek ne anlama gelir?

// Geri çağrı fonksiyonu, başka bir fonksiyona argüman olarak geçirilen bir fonksiyondur. Daha sonra çalıştırılmak üzere tasarlanmıştır. Yani fonksiyon çalıştıktan sonra otomatik olarak diğer fonksiyonun içinde çalıştır demektir.

function hello(bekle){
    setTimeout(function(){
        console.log("Hello"); if (bekle) bekle()
        },3000);
}

function goodbye(){
    console.log("goodbye");
}

hello(goodbye);

