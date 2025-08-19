const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/", authMiddleware, profileController.saveProfile);
router.get("/", authMiddleware, profileController.getProfile);

module.exports = router;
