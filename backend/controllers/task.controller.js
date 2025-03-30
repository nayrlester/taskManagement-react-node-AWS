const taskService = require('../services/task.service');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

