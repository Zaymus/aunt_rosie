const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const room = sequelize.define(
	"room",
	{
		room_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		room_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "room"
	}
);

module.exports = room;
