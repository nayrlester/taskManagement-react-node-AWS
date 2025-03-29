const taskService = require('../services/task.service');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        if (tasks.length === 0) {
            return res.status(404).send({ error: 'Error: No tasks found' });
        }

        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task){
            return res.status(404).send({ error: 'Error: Task not found' });
        }

        res.status(200).send(task);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};4
