require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const transactionRoutes = require('./src/routes/transactionRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', transactionRoutes);
app.use('/api', categoryRoutes);
app.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
});
app.get('/', (req, res) => {
  res.send('Server çalışıyor 🚀');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});