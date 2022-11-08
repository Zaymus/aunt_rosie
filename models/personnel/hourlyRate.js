const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const hourlyRate = sequelize.define(
	"hourly_rate",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		rate: {
			type: Sequelize.DECIMAL(4, 2),
			allowNull: false,
			unique: true,
		},
	},
	{ timestamps: false }
);

module.exports = hourlyRate;
