const express = require("express");
const router = express.Router();
const {
  addToFavorites,
  removeFromFavorites,
  getUserFavoriteLessons,
  getUserFavoriteLessonsByCourse,
} = require("../../controllers/Topics & Courses/favoriteLessonController");

router.post("/", addToFavorites);
router.delete("/:userId/:lessonId", removeFromFavorites);
router.get("/user/:userId", getUserFavoriteLessons);
router.get("/user/:userId/course/:courseId", getUserFavoriteLessonsByCourse);

module.exports = router;
