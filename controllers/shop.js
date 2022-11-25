const { product, batch, inventory } = require("../models/inventory");
const { invoice, invoiceItems } = require("../models/invoice");
const {
	payment,
	transaction,
	transactionType,
	financialTransaction,
} = require("../models/payments");
const axios = require("axios");
const { sequelize } = require("../util/database");
const { env } = require("../util/constants");

exports.getIndex = (req, res, next) => {
	res.render("index", {
		pageTitle: "Dashboard",
		selected: "none",
	});
};

exports.getStore = (req, res, next) => {
	sequelize
		.query("CALL getProductData();")
		.then((products) => {
			console.log(products);
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};
