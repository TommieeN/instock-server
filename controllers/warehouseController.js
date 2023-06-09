const knex = require("knex")(require("../knexfile"));

//GET WAREHOUSES
exports.index = (_req, res) => {
	knex("warehouses")
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) =>
			res.status(400).send(`Error retrieving Warehouses: ${err}`)
		);
};


//EDIT WAREHOUSE
exports.editWarehouse = (req, res) => {
	//validation that all things exist in request
	if (
		!req.body.warehouse_name ||
		!req.body.address ||
		!req.body.city ||
		!req.body.country ||
		!req.body.contact_name ||
		!req.body.contact_position ||
		!req.body.contact_phone ||
		!req.body.contact_email
	) {
		return res
			.status(400)
			.send(
				"Please make sure to provide all warehouse information in your request, edit failed"
			);
	}
	//require valid email address
	if (!req.body.contact_email.includes("@") || !req.body.contact_email.includes(".")) {
	  return res.status(400).send("Please include a valid email, edit failed")
	}
	//require valid phone number length
	if (req.body.contact_phone.length < 10) {
	  return res.status(400).send("Please include a valid phone number, edit failed")
	}
	//warehouses call
	knex("warehouses")
		.update(req.body)
		.where({ id: req.params.id })
		//return error if data aka id does not exist
			.then((data) => {
			if (data === 0) {
			  return res.status(404).send(`Warehouse with ID of ${req.params.id} does not exist, update failed`)
			}
			// if all validation passed, return updated information
			res.status(200).send({
				id: req.params.id,
				...req.body,
			});
		})
		.catch((err) =>
			res
				.status(400)
				.send(`Error updating Warehouse with id of ${req.params.id} ${err}`)
		);
};


//GET INVENTORY OF A GIVEN WAREHOUSE
exports.warehouseInventories = (req, res) => {
	knex("inventories")
		.where({ warehouse_id: req.params.id })
		.then((data) => {
			res.status(200).json(data)
			console.log(data)
		})
		.catch((err) => 
			res	
				.status(400)
				.send(`Error retrieving inventories for warehouse ${req.params.id} ${err}`)
		)
}


//* ADD NEW WAREHOUSE *//

exports.addNewWarehouse = (req, res) => {
	//validation that all things exist in request
	if (
		!req.body.warehouse_name ||
		!req.body.address ||
		!req.body.city ||
		!req.body.country ||
		!req.body.contact_name ||
		!req.body.contact_position ||
		!req.body.contact_phone ||
		!req.body.contact_email
	) {
		return res
			.status(400)
			.send(
				"Please make sure to provide all warehouse information in your request, edit failed"
			);
	}
	//require valid email address
	if (!req.body.contact_email.includes("@") || !req.body.contact_email.includes(".")) {
	  return res.status(400).send("Please include a valid email, edit failed")
	}
	//require valid phone number length
	if (req.body.contact_phone.length < 10) {
	  return res.status(400).send("Please include a valid phone number, edit failed")
	}
  
	// INSERT NEW WAREHOUSE INTO DATABASE
	knex("warehouses")
	  .insert(req.body)
	  .then((result) => {
		const id = result[0]; 
		res.status(201).send({ id, ...req.body });
	  })
	  .catch((err) => {
		res.status(500).send(`Error creating warehouse: ${err.message}`);
	  });
  };
  

  	// Get single warehouse //
	exports.singleWarehouse = (req, res) => {
		knex("warehouses")
			.where({ id: req.params.id })
			.then((data) => {
				if (!data.length) {
					return res
						.status(404)
						.send(`Warehouse with id: ${req.params.id} not found`)
				}

				res.status(200).json(data[0]);
			})
			.catch(() => 
				res.status(400).send(`Error: unable to retrieve warehouse ${req.params.id} ${error}`)
			);
	};

  	// Delete a Warehouse //
	exports.deleteWarehouse = (req, res) => {
		// This will also delete inventories associated due to foreign key
		knex("warehouses")
			.delete()
			.where({ id: req.params.id })
			// From knex documentation: "delete: resolves the promise / fulfills the callback with the number of affected rows for the query"
			.then((affectedRows) => {
				if (affectedRows === 0) {
					res.status(404).send(`Warehouse with id: ${req.params.id} not found`)
				} else {
					res
						.status(204)
						.send(`Warehouse with id: ${req.params.id} has been removed`);
				}
			})
			.catch((err) =>
				res.status(400).send(`Error: unable to remove warehouse ${req.params.id} ${err}`)
			);
	};