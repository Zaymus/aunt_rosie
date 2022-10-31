const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const staff = sequelize.define("staff", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
});

module.exports = staff;
