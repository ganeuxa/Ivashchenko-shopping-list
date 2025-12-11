const express = require('express');
const router = express.Router();
const {
  getAllItems,
  addItem,
  deleteItem,
  togglePurchased,
  checkout,
  clearCart
} = require('../controllers/itemsController');

router.get('/', getAllItems);
router.post('/', addItem);
router.delete('/:id', deleteItem);
router.patch('/:id/toggle', togglePurchased);
router.post('/checkout', checkout);      // ← новый маршрут
router.delete('/clear', clearCart);      // ← опционально

module.exports = router;