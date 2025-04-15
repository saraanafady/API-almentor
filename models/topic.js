const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const topicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
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
    contentType: {
      type: String,
      enum: ["video", "text", "quiz", "assignment", "discussion", "other"],
      default: "video"
    },
    content: {
      videoUrl: {
        type: String
      },
      textContent: {
        type: String
      },
      attachments: [
        {
          name: String,
          url: String,
          type: String
        }
      ]
    },
    duration: {
      type: Number, 
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    subTopics: [{
      type: Schema.Types.ObjectId,
      ref: "SubTopic"
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Topic", topicSchema);
