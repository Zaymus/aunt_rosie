const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff");

router.get("/all", staffController.getStaff);

router.post("/new", staffController.postNewStaff);

router.get("/:staffId", staffController.getStaffbyId);

router.put("/:staffId", staffController.putDeleteStaff);

router.patch("/:staffId", staffController.patchEditStaff);

module.exports = router;
