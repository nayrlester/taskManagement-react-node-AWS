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
