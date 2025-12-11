const express = require('express');
const path = require('path');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;


const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(logger);


app.use('/api/items', itemsRouter);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🛒 Сервер запущен на http://localhost:${PORT}`);
});