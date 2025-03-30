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
    try {
        const newTask = new Task({
            title: taskData.title,
            description: taskData.description || "", 
            status: taskData.status || "To Do",
            createdAt: taskData.createdAt ? new Date(taskData.createdAt) : Date.now()
        });

        return await newTask.save();
    } catch (err) {
        throw new Error(err);
    }
};

exports.updateTask = async (id, taskData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Task ID");
    }

    const updateData = { ...taskData };
    delete updateData.createdAt;

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });

    if (!updatedTask) {
        throw new Error("Task not found");
    }

    return updatedTask;
};

exports.deleteTask = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Task ID");
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
        throw new Error("Task not found");
    }

    return deletedTask;
};


