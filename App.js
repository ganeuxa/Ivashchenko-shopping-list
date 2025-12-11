const express = require('express');
const path = require('path');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для логирования запросов
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));
// JSON-тело
app.use(express.json());
// Наш middleware
app.use(logger);

// Роуты
app.use('/api/items', itemsRouter);

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🛒 Сервер запущен на http://localhost:${PORT}`);
});