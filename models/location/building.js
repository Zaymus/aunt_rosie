const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const building = sequelize.define(
	"building",
	{
		building_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		building_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "building"
	}
);

module.exports = building;
