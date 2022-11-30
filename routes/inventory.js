const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const isAuth = require("../middleware/isAuth");

router.get("/new", inventoryController.getNewProduct);
router.post("/new", inventoryController.postNewProduct);
router.get("/", inventoryController.getProducts);
router.get("/:productId", inventoryController.getProductById);
router.get("/:productId/edit", isAuth, inventoryController.getUpdateProduct);
router.post("/:productId/edit", inventoryController.postUpdateProduct);
router.patch("/:productId", inventoryController.patchUpdateProduct);
router.put("/:productId", inventoryController.putDeleteProduct);
router.get("/batch/:productId", inventoryController.getBatch);
router.post("/batch/:productId", inventoryController.postBatch);
// router.post("/cart/add/:productId", inventoryController.postAddToCart);

module.exports = router;
