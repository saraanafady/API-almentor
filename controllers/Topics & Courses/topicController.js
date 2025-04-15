const Topic = require("../../models/Topics & Courses/topic");

const createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate("subTopics");
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateTopic = async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTopic)
      return res.status(404).json({ message: "Topic not found" });
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteTopic = async (req, res) => {
  try {
    const deleted = await Topic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Topic not found" });
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopicsByCourse = async (req, res) => {
  try {
    const topics = await Topic.find({ course: req.params.courseId });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTopicsByLesson = async (req, res) => {
  try {
    const topics = await Topic.find({ lesson: req.params.lessonId });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  getTopicsByCourse,
  getTopicsByLesson,
};
