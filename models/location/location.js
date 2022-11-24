const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const location = sequelize.define(
	"location",
	{
		location_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		country: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		province: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		City: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ 
		timestamps: false,
		tableName: "location"
	 }
);

module.exports = location;
