const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const batch = sequelize.define("batch", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	bakeDate: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	expiryDate: {
		type: Sequelize.DATE,
		allowNull: false,
	},
});

module.exports = batch;
