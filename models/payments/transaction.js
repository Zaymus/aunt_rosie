const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const transaction = sequelize.define("transaction", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	price: {
		type: Sequelize.DECIMAL,
		allowNull: false,
	},
});

module.exports = transaction;
