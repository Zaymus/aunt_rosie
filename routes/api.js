const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.get("/product/:productId", apiController.getProductById);

router.post("/auth", apiController.postAuth);

module.exports = router;