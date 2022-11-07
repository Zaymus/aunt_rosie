const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const floor = sequelize.define(
	"floor",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		floorNum: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = floor;
