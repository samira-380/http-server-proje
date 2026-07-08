require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const transactionRoutes = require('./src/routes/transactionRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

app.use(express.json());

connectDB();

app.use('/api', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Server çalışıyor 🚀');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});