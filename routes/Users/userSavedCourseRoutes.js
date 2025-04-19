const express = require('express');
const router = express.Router();
const {
  saveCourse,
  unsaveCourse,
  getUserSavedCourses
} = require('../../controllers/Users/userSavedCourseController');

router.post('/', saveCourse);
router.delete('/:userId/:courseId', unsaveCourse);
router.get('/user/:userId', getUserSavedCourses);

module.exports = router;