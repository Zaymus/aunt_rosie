const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff");

router.get("/all", staffController.getStaff);

router.post("/new", staffController.postNewStaff);

router.get("/new", staffController.getNewStaff);

router.get("/:staffId", staffController.getStaffbyId);

router.get("/:staffId/edit", staffController.getEditStaff);

router.post("/:staffId/edit", staffController.postEditStaff);

router.put("/:staffId", staffController.putDeleteStaff);

router.patch("/:staffId", staffController.patchEditStaff);

module.exports = router;
