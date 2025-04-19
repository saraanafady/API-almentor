const UserSavedCourse = require('../../models/Users/userSavedCourse');

const saveCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const savedCourse = await UserSavedCourse.create({ userId, courseId });
    res.status(201).json(savedCourse);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Course already saved" });
    }
    res.status(500).json({ message: error.message });
  }
};

const unsaveCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    await UserSavedCourse.findOneAndDelete({ userId, courseId });
    res.status(200).json({ message: "Course removed from saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserSavedCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedCourses = await UserSavedCourse.find({ userId })
      .populate('courseId')
      .sort({ savedAt: -1 });
    res.status(200).json(savedCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveCourse, unsaveCourse, getUserSavedCourses };