const procedures = require("../util/procedures");
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
const sequelize = require("../util/database");
const { env } = require("../util/constants");
const axios = require("axios");

exports.getNewProduct = (req, res, next) => {
	shelf.findAll()
		.then(shelves => {
			res.render('product/new-product', {
				pageTitle: "Create Product",
				selected: "inventory",
				locations: shelves
			})
		})
		.catch(err => {
			res.status(400).json({err});
		})
}

exports.postNewProduct = (req, res, next) => {
	const productName = req.body.product_name;
	const shelfLife = req.body.shelf_life;
	const ingredients = req.body.ingredients.split(",").join("|");
	const salePrice = req.body.sale_price;
	const productCost = req.body.product_cost;

	product
		.create({
			product_name: productName,
			shelf_life: shelfLife,
			ingredients: ingredients,
			sale_price: salePrice,
			product_cost: productCost
		})
		.then((prod) => {
			product.sync()
				.then(result => {
					res.redirect(`/inventory/${prod.dataValues.product_id}`);
				})
				.catch(err => {
					res.status(400).json({err});
				})
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getProducts = (req, res, next) => {

	procedures.getProductData
		.then(result => {
			res.render("product/products", {
				pageTitle: "Inventory",
				selected: "inventory",
				products: result
			})
		})
		.catch(err => {
			res.status(400).json({err});
		});
};

exports.getProductById = (req, res, next) => {
	const id = req.params.productId;

	sequelize
		.query('CALL getProductDataFromId(:param_id)',
    	{replacements: {param_id: id}})
		.then(result => {
			res.render('product/product', {
				pageTitle: result[0].product_name,
				selected: 'inventory',
				product: result[0]
			});
		})
		.catch(err => {
			res.status(400).json({err});
		})
	// product
	// 	.findByPk(id)
	// 	.then((product) => {
	// 		res.json({ product });
	// 	})
	// 	.catch((err) => {
	// 		res.status(400).json({ err });
	// 	});
};

exports.getUpdateProduct = (req, res, next) => {
	const id = req.params.productId;

	sequelize
		.query('CALL getProductDataFromId(:param_id)',
    	{replacements: {param_id: id}})
		.then(result => {
			console.log(result);
			const productData = result;
			shelf.findAll()
				.then(shelves => {
					console.log(productData, shelves);
					res.render('product/edit-product', {
						pageTitle: result[0].product_name,
						selected: 'inventory',
						product: result[0],
						locations: shelves
					});
				})
				.catch(err => {
					console.log("test");
					res.status(400).json({err});
				});
		})
		.catch(err => {
			res.status(400).json({err});
		})
}

exports.postUpdateProduct = (req, res, next) => {
	const id = req.params.productId;
	product.findByPk(id)
		.then((product) => {
			let {shelf, ...productData} = req.body;
			productData.ingredients = productData.ingredients.split(",").join("|");
			productData.product_name = product.product_name;
			
			axios.patch(`${env.BASE_URL}/inventory/${id}`, {
				product_name: productData.product_name,
				...productData
			})
			.then((result) => {
				inventory.findAll({where: {product_id: id}})
					.then(result => {
						const batchId = result[0].dataValues.batch_id;
						batch.findByPk(batchId)
							.then(batch => {
								batch.set({...batch, batch_location: shelf});
								batch.save()
									.then(result => {
										res.redirect(`/inventory/${id}`);
									})
									.catch(err => {
										res.status(400).json({err});
									});
							})
							.catch(err => {
								console.log(4);
								res.status(400).json({err});
							});
					})
					.catch(err => {
						console.log(3);
						res.status(400).json({err});
					});
			})
			.catch((err) => {
				console.log(2);
				res.status(400).json({err});
			});
		})
		.catch((err) => {
			console.log(1);
			res.status(400).json({err})
	});
}

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
