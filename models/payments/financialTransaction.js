const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const financialTransaction = sequelize.define(
	"financial_transaction",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		amountPaid: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = financialTransaction;
