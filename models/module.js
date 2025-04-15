const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true
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
    lessons: [{
      type: Schema.Types.ObjectId,
      ref: "Lesson"
    }],
    prerequisites: [{
      type: Schema.Types.ObjectId,
      ref: "Module"
    }],
    learningObjectives: [{
      type: String,
      trim: true
    }],
    completionCriteria: {
      type: String,
      enum: ["all-lessons", "quiz-pass", "assignment", "mixed"],
      default: "all-lessons"
    },
    resources: [{
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ["pdf", "video", "link", "file", "other"],
        default: "link"
      },
      url: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
          },
          message: props => `${props.value} is not a valid URL!`
        }
      },
      description: {
        type: String
      }
    }],
    quizzes: [{
      type: Schema.Types.ObjectId,
      ref: "Quiz"
    }],
    assignments: [{
      type: Schema.Types.ObjectId,
      ref: "Assignment" 
    }],
    coverImage: {
      type: String,
      default: ""
    },
    tags: [{
      type: String,
      trim: true
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// Add all your middleware and virtual properties here
moduleSchema.virtual('completionPercentage').get(function() { 
    if (!this.lessons || this.lessons.length === 0) return 0; 
    // Example logic: Assume each lesson has a `completed` field
    const completedLessons = this.lessons.filter(lesson => lesson.completed).length;
    return (completedLessons / this.lessons.length) * 100;
  }); 
  
  // Pre-save middleware to update course when module is added 
  moduleSchema.pre("save", async function(next) { 
    if (this.isNew) { 
      try { 
        // Find the course and add this module's ID to its modules array 
        await mongoose.model("Course").findByIdAndUpdate( 
          this.course, 
          { $push: { modules: this._id } } 
        ); 
      } catch (err) { 
        next(err); 
      } 
    } 
    next(); 
  }); 
  
  // Pre-remove middleware to update course when module is deleted 
  moduleSchema.pre("remove", async function(next) { 
    try { 
      // Remove this module's reference from its course 
      await mongoose.model("Course").findByIdAndUpdate( 
        this.course, 
        { $pull: { modules: this._id } } 
      ); 
      
      // Also remove all lessons associated with this module 
      await mongoose.model("Lesson").deleteMany({ module: this._id }); 
    } catch (err) { 
      next(err); 
    } 
    next(); 
  }); 
  
  // Method to get all content (lessons, topics, subtopics) for this module 
  moduleSchema.methods.getAllContent = async function() { 
    // Populate all related lessons 
    await this.populate({ 
      path: 'lessons', 
      populate: { 
        path: 'topics', 
        populate: { 
          path: 'subTopics' 
        } 
      } 
    }); 
    return this; 
  };

moduleSchema.index({ order: 1 });

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;