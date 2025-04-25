const mongoose = require('mongoose');

const userSavedCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent duplicate saves

module.exports = mongoose.model('UserSavedCourse', userSavedCourseSchema);