const Task = require('../models/Tasks');
const mongoose = require('mongoose');

exports.getAllTasks = async () => {
    return await Task.find();
};

exports.getTaskById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Task ID");
    }
    return await Task.findById(id);
};

exports.createTask = async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
};

exports.updateTask = async (id, taskData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Task ID");
    }
    return await Task.findByIdAndUpdate(id, taskData, { new: true, runValidators: true });
};

exports.deleteTask = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Task ID");
    }
    return await Task.findByIdAndDelete(id);
};
