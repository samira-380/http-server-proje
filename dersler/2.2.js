const express = require('express');
const app = express();
const PORT = 3000;

// 1. /ping Endpoint'i
app.get('/ping', (req, res) => {
    res.json({ status: "ok" });
});

// 2. /transactions Endpoint'i (Eski kodundaki boş array)
app.get('/transactions', (req, res) => {
    res.json([]);
});

// Sunucuyu ayağa kaldırıyoruz
app.listen(PORT, () => {
    console.log(`Sunucu aktif: http://localhost:${PORT}`);
});