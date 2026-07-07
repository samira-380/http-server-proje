require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const transactionRoutes = require('./src/routes/transactionRoutes');

const app = express();

app.use(express.json());

connectDB();

app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server çalışıyor 🚀');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});