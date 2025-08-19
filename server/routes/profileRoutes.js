const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// Routes
router.post("/:userId", profileController.saveProfile);
router.get("/:userId", profileController.getProfile);

module.exports = router;
