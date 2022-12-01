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
			type: Sequelize.DECIMAL,
			allowNull: false,
		},
		paid: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	},
	{ 
		timestamps: false,
		tableName: "invoice"
	 }
);

module.exports = invoice;
