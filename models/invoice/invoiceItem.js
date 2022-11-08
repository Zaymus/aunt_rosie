const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const invoiceItem = sequelize.define(
	"invoice_item",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		discount: {
			type: Sequelize.DECIMAL(10, 2),
		},
	},
	{ timestamps: false }
);

module.exports = invoiceItem;
