const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const shelf = sequelize.define("shelf", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	Name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = shelf;
