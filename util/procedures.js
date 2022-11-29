const sequelize = require("./database");

const procedures = {
  getProductData: sequelize.query('CALL getProductData'),
}


module.exports = procedures;