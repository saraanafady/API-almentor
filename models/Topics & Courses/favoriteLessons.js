const mongoose = require('mongoose');

const favoriteLessonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate favorites

module.exports = mongoose.model('FavoriteLesson', favoriteLessonSchema);