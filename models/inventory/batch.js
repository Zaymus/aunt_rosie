const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const batch = sequelize.define(
	"batch",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		bake_date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		expiry_date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		references: {
			model: "shelves",
			key: "id",
		},
	}
);

module.exports = batch;
