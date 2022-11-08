const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const product = sequelize.define(
	"product",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		shelfLife: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		ingredients: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		salePrice: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		productCost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		storageType: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = product;
