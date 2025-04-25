const mongoose = require('mongoose');
// const { Schema } = mongoose;
const courseSchema = new mongoose.Schema(
  {
    // Core Fields
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    subtopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTopic",
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Content
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    freeLessons: [
      {
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
        title: String,
        duration: Number,
      },
    ],

    // Filtering/Sorting
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    language: {
      type: String,
      enum: ["ar", "en", "fr"],
      default: "ar",
    },
    duration: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    // Stats
    enrollmentCount: {
      type: Number,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Course", courseSchema);
