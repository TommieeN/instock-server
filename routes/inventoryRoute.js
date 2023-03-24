const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router
.route('/')
.get(inventoryController.index);

router
.route('/:id')
.put(inventoryController.updateInventoryItem);

module.exports = router;