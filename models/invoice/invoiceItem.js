const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const invoiceItem = sequelize.define(
	"invoice_item",
	{
		item_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
	},
	{ 
		timestamps: false,
		tableName: "invoice_items"
	}
);

module.exports = invoiceItem;
