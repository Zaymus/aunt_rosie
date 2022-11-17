const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const inventory = sequelize.define(
	"inventory",
	{
		inventory_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
	},
	{
		timestamps: false,
		tableName: "inventory"
	}
);

module.exports = inventory;
