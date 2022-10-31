const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const product = sequelize.define("product", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
});

module.exports = product;
