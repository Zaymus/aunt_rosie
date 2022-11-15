const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const inventory = sequelize.define(
	"inventory",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		references: {
			model: "batches",
			key: "id",
		},
		references: {
			model: "products",
			key: "id",
		},
	}
);

module.exports = inventory;
