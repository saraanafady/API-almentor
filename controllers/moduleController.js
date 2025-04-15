const Module = require("../models/module");
const module = require("../models/module");

const createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getModulesByCourse = async (req, res) => {
  try {
    const modules = await Module.find({ course: req.params.courseId });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createModule,
  getModulesByCourse
  
};
