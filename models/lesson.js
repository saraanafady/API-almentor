const mongoose = require("mongoose");

// 🛠️ إضافة تعريف Schema
const Schema = mongoose.Schema;

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    order: {
      type: Number,
      required: true
    },
    duration: {
      type: Number, 
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    isFree: {
      type: Boolean,
      default: false
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    topics: [{
      type: Schema.Types.ObjectId,
      ref: "Topic"
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Lesson", lessonSchema);
