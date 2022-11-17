const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const floor = sequelize.define(
	"floor",
	{
		floor_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		floor_num: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "floor"
	}
);

module.exports = floor;
