const http = require('http');

const server = http.createServer((req, res) => {
  // Gelen isteğin hangi adrese (url) ve hangi yöntemle (method) geldiğini kontrol ediyoruz

  if (req.method === 'GET' && req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  }

  else if (req.method === 'GET' && req.url === '/transactions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }

  else {
    // Bu iki adresin dışında bir istek gelirse "bulunamadı" diyoruz
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Sunucu çalışıyor: http://localhost:3000');
});

//HTTP neden stateless? Bu ne anlama geliyor?
//sunucuların hafızası yoktur ve geçmişteki işlemlerimizi anlayamaz. her işlemden sonra hafıza sıfırlanır gibi düşünebiliriz.

//req ve res nesneleri nereden geliyor?
//reg ve res http ile otomatik olarak geliyor. req yani request ile istenilenleri okuyoruz ve req yani response ile o isteğe karşılık veriyoruz.