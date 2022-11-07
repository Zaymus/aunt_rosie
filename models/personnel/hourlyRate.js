const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const hourlyRate = sequelize.define("hourly_rate", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	rate: {
		type: Sequelize.DECIMAL,
		allowNull: false,
	},
});

module.exports = hourlyRate;
