const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const payment = sequelize.define(
	"payment",
	{
		payment_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		amountDue: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{ 
		timestamps: false,
		tableName: "payment"
	 }
);

module.exports = payment;
