const Sequelize = require("sequelize");
const env = require("./constants");

const env = process.env;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
	dialect: "mysql",
	host: env.DB_HOST,
});

module.exports = sequelize;
