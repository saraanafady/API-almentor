const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 200
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    coverImage: {
      type: String,
      default: ""
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "all-levels"],
      default: "all-levels"
    },
    language: {
      type: String,
      default: "English"
    },
    duration: {
      type: Number,
      default: 0
    },
    lessons: [{
      type: Schema.Types.ObjectId,
      ref: "Lesson"
    }],
    requirements: [{
      type: String,
      trim: true
    }],
    learningOutcomes: [{
      type: String,
      trim: true
    }],
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    },
    enrolledStudents: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    enrollmentCount: {
      type: Number,
      default: 0
    },
    isSaved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("Course", courseSchema);//course i anew class

mongoose.set('strictPopulate', false);