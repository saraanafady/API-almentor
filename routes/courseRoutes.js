const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById); // Get course by ID
router.put("/:id", updateCourse); // Update course
router.delete("/:id", deleteCourse); // Delete course

module.exports = router;

