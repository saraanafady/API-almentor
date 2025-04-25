const mongoose = require('mongoose');
const { Schema } = mongoose;
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    order: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },
    content: {
      videoUrl: String,
      articleText: String,
      attachments: [
        {
          name: String,
          url: String,
          type: { type: String, enum: ["pdf", "slide", "audio"] },
        },
      ],
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

lessonSchema.pre("remove", async function (next) {
  await mongoose.model("Lesson").deleteMany({ module: this._id });
  next();
});

lessonSchema.index({ module: 1, order: 1 });
lessonSchema.index({ isPublished: 1 });
