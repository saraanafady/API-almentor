const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/EnrollmentController");


router.post("/", enrollmentController.createEnrollment);
router.get("/user/:userId", enrollmentController.getEnrollmentsByUser);

module.exports = router;