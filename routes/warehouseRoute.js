const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);

router.route('/:id').get(warehouseController.editWarehouse);

module.exports = router;