const knex = require("knex")(require("../knexfile"));

//GET ALL INVENTORY
exports.index = (_req, res) => {
	knex("inventories")
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => res.status(400).send(`Error retrieving Inventory: ${err}`));
};


//UPDATE INVENTORY ITEM
exports.updateInventoryItem = (req, res) => {
	//validation that those things exist in the request
	if (
		!req.body.warehouse_id ||
		!req.body.item_name ||
		!req.body.description ||
		!req.body.category ||
		!req.body.status ||
		!req.body.quantity
	) {
		return res
			.status(400)
			.send(
				"Please make sure to provide warehouse id, item name, a descriptin, a category, if it's in or out of stock, and quantity in your request"
			);
	}
  // validate that quantity is a number
	if (typeof parseInt(req.body.quantity) !== "number") {
		return res
			.status(400)
			.send(
				`Quantity of ${req.body.quantity} is not a valid entry, update failed`
			);
	}
  //make a warehouse call and return error if warehouse id does not match an existing warehouse
	knex("warehouses")
		.where({ id: req.body.warehouse_id })
		.then((data) => {
			if (!data.length) {
				res
					.status(400)
					.send(`Warehouse ${req.body.warehouse_id} does not exist`);
			}
			// make request if all inputs received
			knex("inventories")
				.update(req.body)
				.where({ id: req.params.id })
        //return error if data aka id dies not exist
				.then((data) => {
					if (data === 0) {
            return res.status(404).send(`Inventory with ID of ${req.params.id} does not exist, update failed`)
          }
          // if all validation passed, return updated information
					res.status(200).send({
            "id": req.params.id,
            ...req.body
          });
				})
				.catch(() =>
					res
						.status(400)
						.send(`Error updating Inventory Item ${req.params.id} ${err}`)
				);
		});
};