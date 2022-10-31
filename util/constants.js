const dotenv = require("dotenv").config();

const env = process.env;

SERVER_STATUS = {
	UP: "up",
};

module.exports = {
	env,
	SERVER_STATUS,
};
