const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reports");

router.get("/", reportController.getReports);
router.get("/low-quantity", reportController.getQuantity);
router.post("/low-quantity", reportController.postQuantity);
router.get("/expiring-soon", reportController.getExpire);
router.post("/expiring-soon", reportController.postExpire);

module.exports = router;