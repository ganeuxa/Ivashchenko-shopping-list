let shoppingList = [];
let nextId = 1;

const getAllItems = (req, res) => {
  const { purchased } = req.query;
  let filtered = shoppingList;

  if (purchased !== undefined) {
    const isPurchased = purchased === 'true';
    filtered = shoppingList.filter(item => item.purchased === isPurchased);
  }

  res.json(filtered);
};

const addItem = (req, res) => {
  const { name, quantity = 1, price = 0 } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Название товара обязательно' });
  }

  const newItem = {
    id: nextId++,
    name: name.trim(),
    quantity: Number(quantity) || 1,
    price: Number(price) || 0,
    purchased: false,
    createdAt: new Date().toISOString()
  };

  shoppingList.push(newItem);
  res.status(201).json(newItem);
};

const deleteItem = (req, res) => {
  const id = Number(req.params.id);
  const index = shoppingList.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  shoppingList.splice(index, 1);
  res.status(204).send();
};

const togglePurchased = (req, res) => {
  const id = Number(req.params.id);
  const item = shoppingList.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  item.purchased = !item.purchased;
  res.json(item);
};

// НОВЫЙ ЭНДПОИНТ: получить итоговую сумму купленных товаров
const checkout = (req, res) => {
  const purchasedItems = shoppingList.filter(item => item.purchased);
  const total = purchasedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({
    total: parseFloat(total.toFixed(2)),
    count: purchasedItems.length,
    message: 'Приятных покупок и отличного дня!'
  });
};

// Опционально: очистить корзину (можно добавить, если нужно)
const clearCart = (req, res) => {
  shoppingList = [];
  nextId = 1;
  res.json({ message: 'Корзина очищена' });
};

module.exports = {
  getAllItems,
  addItem,
  deleteItem,
  togglePurchased,
  checkout,
  clearCart
};