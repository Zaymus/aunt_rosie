const sequelize = require("../util/database");
const { staff } = require("../models/personnel");
const { isAdmin, cookieTimeout15M } = require("../util/constants");

exports.getProductById = (req, res, next) => {
  const id = req.params.productId;

  sequelize
		.query('CALL getProductDataFromId(:param_id)',
    	{replacements: {param_id: id}})
		.then(product => {
			res.status(200).json({product: product});
		})
		.catch(err => {
			res.status(400).json({err});
		})
}

exports.postAuth = (req, res, next) => {
	const id = parseInt(req.body.staffId);
	const returnUri = req.body.returnUri;

	staff.findByPk(id)
		.then(employee => {
			if(isAdmin(employee.emp_type)) {
				const expDate = new Date();
				expDate.setTime(expDate.getTime() + cookieTimeout15M);
				res.cookie('isAuthorized', true, {expires: expDate})
				res.redirect(`${returnUri}?authorized=${true}`);
			}
			else {
				res.render("auth/auth", {
					pageTitle: "Authentication Needed",
					selected: "none",
					returnUri: returnUri,
					errorMsg: "Authentication Failed: Incorrect authorization code.",
				});
			}
		})
		.catch(err => {
			res.render("auth/auth", {
				pageTitle: "Authentication Needed",
				selected: "none",
				returnUri: returnUri,
				errorMsg: "Authentication Failed: Authorization Code Invalid",
			});
		});
}