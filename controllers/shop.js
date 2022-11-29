const product = require("../models/inventory/product");

exports.getIndex = (req, res, next) => {
	res.render("index", {
		pageTitle: "Dashboard",
		selected: "none",
	});
};

exports.getShop = (req, res, next) => {
	product.findAll()
		.then(products => {
			res.render("shop/shop", {
				pageTitle: "Shop",
				selected: "sale",
				products: products
			});
		})
		.catch(err => {
			res.json({err});
		});
};
