const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const staff = sequelize.define(
	"staff",
	{
		staff_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		emp_type: {
			type: Sequelize.STRING(4),
			allowNull: false,
		},
		home_address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		phone_number: {
			type: Sequelize.STRING(12),
			allowNull: false,
		},
		email_address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		province: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		country: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		postal_code: {
			type: Sequelize.STRING(7),
			allowNull: false,
		},
	},
	{
		timestamps: false,
		initialAutoIncrement: 1000,
		tableName: "staff"
	}
);

module.exports = staff;
