const { product, batch, inventory } = require("../models/inventory");
const {
	location,
	building,
	floor,
	room,
	section,
	shelf,
} = require("../models/location");
const { getCurrentDate, addDays } = require("../util/date");

exports.postNewProduct = (req, res, next) => {
	const name = req.body.name;
	const shelfLife = req.body.shelf_life;
	const ingredients = req.body.ingredients;
	const salePrice = req.body.sale_price;
	const productCost = req.body.product_cost;
	const storageType = req.body.storage_type;

	product
		.create({
			name: name,
			shelf_life: shelfLife,
			ingredients: ingredients,
			sale_price: salePrice,
			product_cost: productCost,
			storage_type: storageType,
		})
		.then((result) => {
			res.json({ result });
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getProducts = (req, res, next) => {
	product
		.findAll()
		.then((products) => {
			res.json({ products });
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getProductById = (req, res, next) => {
	const id = req.params.productId;

	product
		.findByPk(id)
		.then((product) => {
			res.json({ product });
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.patchUpdateProduct = (req, res, next) => {
	const id = req.params.productId;
	const name = req.body.name;
	const shelfLife = req.body.shelf_life;
	const ingredients = req.body.ingredients;
	const salePrice = req.body.sale_price;
	const productCost = req.body.product_cost;
	const storageType = req.body.storage_type;

	product
		.findByPk(id)
		.then((product) => {
			product.set({
				name: name,
				shelf_life: shelfLife,
				ingredients: ingredients,
				sale_price: salePrice,
				product_cost: productCost,
				storage_type: storageType,
			});

			product
				.save()
				.then((result) => {
					res.json({ result });
				})
				.catch((err) => {
					res.status(400).json({ err });
				});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.putDeleteProduct = (req, res, next) => {
	const id = req.params.productId;

	product
		.findByPk(id)
		.then((product) => {
			product
				.destroy()
				.then((result) => {
					res.json({});
				})
				.catch((err) => {
					res.status(400).json({ err });
				});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getBatch = (req, res, next) => {
	const productId = req.params.productId;

	product
		.findByPk(productId)
		.then((product) => {
			//update to send data to ejs file instead of json body response
			res.json({ product: product.name, shelfLife: product.shelf_life });
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.postBatch = (req, res, next) => {
	const productId = req.params.productId;
	const shelfLife = req.body.shelf_life;
	const quantity = req.body.quantity;
	const location = req.body.shelf_id;
	const bakeDate = getCurrentDate();
	const expiryDate = addDays(shelfLife);

	batch
		.create({
			shelfId: location,
			bake_date: bakeDate,
			expiry_date: expiryDate,
		})
		.then((batch) => {
			inventory
				.create({
					quantity: quantity,
					batchId: batch.id,
					productId: productId,
				})
				.then((result) => {
					res.json({ batch, result });
				})
				.catch((err) => {
					res.status(400).json({ err });
					batch.destroy();
				});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};
