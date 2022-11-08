const { SERVER_STATUS } = require("../util/constants");

exports.getHealth = (req, res, next) => {
	res.json({ status: SERVER_STATUS.UP });
};
