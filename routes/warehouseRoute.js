const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router
.route('/')
.get(warehouseController.index)
.post(warehouseController.addNewWarehouse);

router
.route('/:id')
.put(warehouseController.editWarehouse);

router
.route('/:id/inventories')
.get(warehouseController.warehouseInventories);

module.exports = router;