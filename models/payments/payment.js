const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const payment = sequelize.define("payment", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	amountDue: {
		type: Sequelize.DECIMAL,
		allowNull: false,
	},
});

module.exports = payment;
