const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
  knex('warehouses')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

//edit Warehouse
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
  if (!req.body.contact_email.includes("@" || !req.body.contact_email.includes("."))) {
    return res.status(400).send("Please include a valid email, edit failed")
  }

  //require valid phone number length
  if (parseInt(req.body.contact_phone).length < 10) {
    return res.status(400).send("Please include a valid phone number, edit failed")
  }

  //////////////////////////////////////left off here Wednesday evening...//////////

}