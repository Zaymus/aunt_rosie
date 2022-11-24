const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const product = sequelize.define(
	"product",
	{
		product_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		shelf_life: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		product_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		ingredients: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		sale_price: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		product_cost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{ 
		timestamps: false,
		tableName: "products"
	 }
);

module.exports = product;
