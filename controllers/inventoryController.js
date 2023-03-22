const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
  knex('inventory')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventory: ${err}`)
    );
};

exports.updateItem = (_req, res) => {
  knex('inventory')
    .update(req.body)
    .where({ id: req.params.id })
    .then(() => {
      res.status(200).send(`Inventory with id: ${req.params.id} has been updated`);
    })
    .catch(() => 
    res.status(400).send(`Error updating Inventory Item ${req.params.id} ${err}`)
    );
};
