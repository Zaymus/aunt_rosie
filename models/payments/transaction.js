const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const transaction = sequelize.define(
	"transaction",
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
		price: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{ 
		timestamps: false,
		tableName: "transaction"
	 }
);

module.exports = transaction;
