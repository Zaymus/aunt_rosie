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
	const location = req.body.shelf;
	const quantity = req.body.quantity;
	// const bakeDate = getCurrentDate();
	// const expiryDate = addDays(shelfLife);

	const body = {
		quantity: quantity,
		shelf: location,
	}

	product
		.create({
			product_name: productName,
			shelf_life: shelfLife,
			ingredients: ingredients,
			sale_price: salePrice,
			product_cost: productCost
		})
		.then((prod) => {
			axios.post(`${env.BASE_URL}/inventory/batch/${prod.product_id}`, body)
				.then(result => {
					res.redirect(`/inventory/${prod.product_id}`);
				})
				.catch((err) => {
					res.status(400).json({ err });
				})
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getProducts = (req, res, next) => {

	sequelize.query('CALL getProductData')
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
			shelf.findAll()
				.then(shelves => {
					res.render('product/edit-product', {
						pageTitle: result[0].product_name,
						selected: 'inventory',
						product: result[0],
						locations: shelves
					});
				})
				.catch(err => {
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
			shelf.findAll()
				.then(shelves => {
					res.render('product/new-batch', {
						pageTitle: product.product_name,
						selected: 'inventory',
						product: product,
						locations: shelves
					});
				})
				.catch(err => {
					res.status(400).json({err});
				});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.postBatch = (req, res, next) => {
	const productId = req.params.productId;
	const quantity = req.body.quantity;
	const location = req.body.shelf;
	const bakeDate = getCurrentDate();
	
	product.findByPk(productId)
		.then(product => {
			const expiryDate = addDays(product.shelf_life);
			batch
				.create({
					batch_location: location,
					bake_date: bakeDate,
					expiry_date: expiryDate,
					quantity: quantity,
				})
				.then((batch) => {
					product.addBatch(batch)
						.then(result => {
							res.redirect("/inventory");
						})
						.catch(err => {
					 		batch.destroy();
							res.status(400).json({err});
						});
				})
				.catch((err) => {
					res.status(400).json({ err });
				});
		})
		.catch(err => {
			res.status(400).json({err});
		});
};
