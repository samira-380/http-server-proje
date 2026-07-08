require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const transactionRoutes = require('./src/routes/transactionRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

app.use(express.json());

connectDB();

app.use('/api', transactionRoutes);
app.use('/api', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Server çalışıyor 🚀');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});