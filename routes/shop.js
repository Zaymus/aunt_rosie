const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/shop", shopController.getShop);
router.post("/shop", shopController.postShop);
router.get("/shop/invoice", shopController.getInvoice);
router.post("/shop/invoice", shopController.postInvoice);

module.exports = router;
