const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const shelf = sequelize.define(
	"shelf",
	{
		shelf_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		shelf_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "shelf"
	}
);

module.exports = shelf;
