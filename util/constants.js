const dotenv = require("dotenv").config();

const env = process.env;

const isAdmin = (emp_type) => {
	if (emp_type.includes("-A")) {
		return true;
	}
	return false;
}

const cookieTimeout15M = 900;

SERVER_STATUS = {
	UP: "up",
};

module.exports = {
	env,
	SERVER_STATUS,
	isAdmin,
	cookieTimeout15M,
};
