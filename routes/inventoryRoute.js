const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router.route('/').get(inventoryController.index);

router.route('/inventories/:id').put(inventoryController.updateItem);

module.exports = router;