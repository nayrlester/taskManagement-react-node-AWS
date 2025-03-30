const taskService = require('../services/task.service');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(404).json({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        res.status(200).json(task);
    } catch (err) {
        console.error("Error fetching task:", err);
        res.status(404).json({ error: err.message });
    }
};
