const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const section = sequelize.define(
	"section",
	{
		section_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		section_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "section"
	}
);

module.exports = section;
