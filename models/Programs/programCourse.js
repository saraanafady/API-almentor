const mongoose = require("mongoose");

const programCourseSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("ProgramCourse", programCourseSchema);
