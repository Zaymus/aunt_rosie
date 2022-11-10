const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const section = sequelize.define(
	"section",
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
		references: {
			model: "rooms",
			key: "id",
		},
	}
);

module.exports = section;
