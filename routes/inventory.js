const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");

router.post("/new", inventoryController.postNewProduct);
router.get("/", inventoryController.getProducts);
router.get("/:productId", inventoryController.getProductById);
router.patch("/:productId", inventoryController.patchUpdateProduct);
router.put("/:productId", inventoryController.putDeleteProduct);
// router.post("/cart/add/:productId", inventoryController.postAddToCart);

module.exports = router;
