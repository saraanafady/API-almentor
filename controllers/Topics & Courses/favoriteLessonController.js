const FavoriteLesson = require('../../models/Topics & Courses/favoriteLessons');

const addToFavorites = async (req, res) => {
  try {
    const { userId, lessonId, courseId } = req.body;
    const favorite = await FavoriteLesson.create({ userId, lessonId, courseId });
    res.status(201).json(favorite);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Lesson already in favorites" });
    }
    res.status(500).json({ message: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    await FavoriteLesson.findOneAndDelete({ userId, lessonId });
    res.status(200).json({ message: "Lesson removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserFavoriteLessons = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await FavoriteLesson.find({ userId })
      .populate('lessonId')
      .populate('courseId')
      .sort({ addedAt: -1 });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserFavoriteLessonsByCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const favorites = await FavoriteLesson.find({ 
      userId, 
      courseId 
    })
      .populate('lessonId')
      .sort({ addedAt: -1 });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  addToFavorites, 
  removeFromFavorites, 
  getUserFavoriteLessons,
  getUserFavoriteLessonsByCourse 
};