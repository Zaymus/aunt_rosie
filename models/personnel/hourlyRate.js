const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const hourlyRate = sequelize.define(
	"hourly_rate",
	{
		rate_id: {
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
	{ 
		timestamps: false,
		tableName: "hourly_rate"
	 }
);

module.exports = hourlyRate;
