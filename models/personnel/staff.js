const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const staff = sequelize.define(
	"staff",
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
		emp_type: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		home_address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		phone_Number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email_address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		postal_code: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = staff;
