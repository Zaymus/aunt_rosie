const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const batch = sequelize.define(
	"batch",
	{
		batch_id: {
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
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
		}
	},
	{
		timestamps: false,
		tableName: "batch"
	}
);

module.exports = batch;
