const sequelize = require('../util/database');
const { env } = require('../util/constants');

exports.getReports = (req, res, next) => {
	res.render('reports/reports', {
		pageTitle: 'Reports',
		selected: 'reports',
		baseUrl: env.BASE_URL,
	});
};

exports.getQuantity = (req, res, next) => {
	sequelize
		.query('CALL lowQuantity(6);')
		.then((result) => {
			res.render('reports/lowQuantity', {
				pageTitle: 'Low Quantity',
				selected: 'reports',
				qty: 6,
				data: result,
			});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.postQuantity = (req, res, next) => {
	const quantity = req.body.quantity;

	sequelize
		.query(`CALL lowQuantity(${quantity});`)
		.then((result) => {
			res.render('reports/lowQuantity', {
				pageTitle: 'Low Quantity',
				selected: 'reports',
				qty: quantity,
				data: result,
			});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getExpire = (req, res, next) => {
	sequelize
		.query('CALL soonToExpire(14);')
		.then((result) => {
			res.render('reports/expiringSoon', {
				pageTitle: 'Expiring Soon',
				selected: 'reports',
				days: 14,
				data: result,
			});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.postExpire = (req, res, next) => {
	const days = req.body.days;
	sequelize
		.query(`CALL soonToExpire(${days});`)
		.then((result) => {
			res.render('reports/expiringSoon', {
				pageTitle: 'Expiring Soon',
				selected: 'reports',
				days: days,
				data: result,
			});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};
