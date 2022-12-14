const { invoice } = require('../models/invoice');
const { getCurrentDate } = require('../util/date');
const product = require('../models/inventory/product');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { env } = require('../util/constants');
const sequelize = require('../util/database');

var transporter = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: env.MAILTRAP_USER,
		pass: env.MAILTRAP_PASS,
	},
});

const algorithm = 'aes-256-ctr';
const secretKey = env.ENC_SECRET;

const encrypt = (data) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	};
};

const decrypt = (hash) => {
	const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(hash.iv, 'hex')
	);

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, 'hex')),
		decipher.final(),
	]);

	return decrpyted.toString();
};

exports.getIndex = (req, res, next) => {
	sequelize
		.query('CALL lowQuantityPreview(6);')
		.then((result) => {
			return result;
		})
		.then((lowQty) => {
			sequelize
				.query('CALL soonToExpirePreview(500);')
				.then((result) => {
					return {
						quantity: lowQty,
						expire: result,
					};
				})
				.then((data) => {
					res.render('index', {
						pageTitle: 'Dashboard',
						selected: 'none',
						lowQuantity: data.quantity,
						expireSoon: data.expire,
					});
				})
				.catch((err) => {
					res.status(400).json({ err });
				});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getShop = (req, res, next) => {
	product
		.findAll()
		.then((products) => {
			res.render('shop/shop', {
				pageTitle: 'Shop',
				selected: 'sale',
				products: products,
			});
		})
		.catch((err) => {
			res.json({ err });
		});
};

exports.postShop = (req, res, next) => {
	const saleData = JSON.parse(req.body.cart);
	console.log(saleData);
	invoice
		.create({
			date: getCurrentDate(),
			amount: saleData.totals.grandtotal,
			discount: saleData.totals.discount,
		})
		.then((result) => {
			let data = JSON.stringify({
				invoice: result.dataValues,
				cart: saleData.cart,
				totals: saleData.totals,
			});

			const encryptedData = encrypt(Buffer.from(data, 'utf8'));

			res.redirect(
				`/shop/invoice?iv=${encryptedData.iv}&content=${encryptedData.content}`
			);
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getInvoice = (req, res, next) => {
	let data = { iv: req.query.iv, content: req.query.content };
	let invoiceData = JSON.parse(decrypt(data));
	res.render('shop/invoice', {
		pageTitle: 'invoice',
		selected: 'none',
		invoice: invoiceData.invoice,
		cart: invoiceData.cart,
		totals: invoiceData.totals,
	});
};

exports.postInvoice = (req, res, next) => {
	let data = { iv: req.query.iv, content: req.query.content };
	let invoiceData = JSON.parse(decrypt(data));

	let cart = invoiceData.cart;
	let cartData = '';

	cart.forEach((item) => {
		let name = item.name.replace(/&amp;/g, '&');
		cartData += `<span>${name}</span><span>$${parseFloat(item.price).toFixed(
			2
		)}</span><span>${item.quantity}</span><span>$${item.total.toFixed(
			2
		)}</span>`;
	});

	transporter.sendMail({
		to: req.body.email,
		from: 'no-reply@auntrosies.com',
		subject: `Invoice #${invoiceData.invoice.invoice_id}`,
		html: `<style>.invoice--container {width: 100%;height: 80vh;position: fixed;top: 20vh;left: 0;display: flex;flex-direction: column;align-items: center;margin: 0px auto;overflow-y: scroll;}.invoice--header {width: 60%;height: 30%;display: flex;flex-direction: row;justify-content: space-between;align-items: center;}.invoice--header .logo {height: 100%;}.invoice--header img {height: 100%;}.invoice--body {width: 60%;display: grid;grid-template-columns: 2fr 1fr 1fr 1fr;grid-auto-rows: 50px;margin: 30px 0px;text-align: center;}.invoice--body .heading {font-size: 24pt;}.invoice--totals .totals {background-color: var(--clr-bg);}</style><div class="invoice--container"><div class="invoice--header"><div class="invoice--info"><h2>Invoice #${
			invoiceData.invoice.invoice_id
		}</h2><h3>Issued: ${new Date(
			invoiceData.invoice.date
		).toDateString()}</h3><h3>Payment Type: Cash</h3></div><div class="logo"><img src="http://localhost:3000/images/logo_svg.svg"></div></div><div class="invoice--body"><span class="bold heading">Product</span><span class="bold heading">Price</span><span class="bold heading">Quantity</span><span class="bold heading">Total</span>${cartData}</div><div class="invoice--totals"><div class="totals"><div class="sub-total"><span class="bold">Sub total: </span><span class="sub-total-amount">${parseFloat(
			invoiceData.totals.subtotal
		).toFixed(
			2
		)}</span></div><div class="discount"><span class="bold">Discount: </span><span class="discount-amount">${parseFloat(
			invoiceData.totals.discount
		).toFixed(
			2
		)}</span></div><div class="tax"><span class="bold">Tax: </span><span class="tax-amount">${parseFloat(
			invoiceData.totals.tax
		).toFixed(
			2
		)}</span></div><div class="grand-total"><span class="bold">Grand total: </span><span class="grand-total-amount">${parseFloat(
			invoiceData.totals.grandtotal
		).toFixed(2)}</span></div></div></div></div>`,
	});
	res.redirect('/');
};
