const knex = require("knex")(require("./knexfile"));

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;



app.use(express.json());
app.use(cors());

const warehouseRoutes = require('./routes/warehouseRoute');
const inventoryRoutes = require('./routes/inventoryRoute');

app.use('/warehouses', warehouseRoutes);
app.use('/inventories', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
  });  