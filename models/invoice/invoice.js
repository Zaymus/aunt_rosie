const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const invoice = sequelize.define(
	"invoice",
	{
		invoice_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		amount: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		discount: {
			type: Sequelize.DECIMAL(10, 2),
		},
	},
	{ 
		timestamps: false,
		initialAutoIncrement: 10000,
		tableName: "invoice"
	 }
);

module.exports = invoice;
