const express = require("express");
const router = express.Router();
const {
  createProgramCourse,
  getAllProgramCourses,
  getProgramCourseById,
  updateProgramCourse,
  deleteProgramCourse,
} = require("../../controllers/Programs/programCourseController");

router.post("/", createProgramCourse);
router.get("/", getAllProgramCourses);
router.get("/:id", getProgramCourseById);
router.put("/:id", updateProgramCourse);
router.delete("/:id", deleteProgramCourse);

module.exports = router;