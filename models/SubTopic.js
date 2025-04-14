const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const subTopicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
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
      default: "text"
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
      type: Number, // duration in minutes
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("SubTopic", subTopicSchema);
