const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.get("/product/:productId", apiController.getProductById);

module.exports = router;