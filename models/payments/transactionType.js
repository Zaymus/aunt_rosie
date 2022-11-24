const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const transactionType = sequelize.define(
	"transaction_type",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ 
		timestamps: false,
		tableName: "transaction_type"
	 }
);

module.exports = transactionType;
