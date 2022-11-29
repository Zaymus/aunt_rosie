const sequelize = require("../util/database");

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