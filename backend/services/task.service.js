const Tasks = require('../models/Tasks');

exports.getAllTasks = async () => {
    try {
        const tasks = await Tasks.find();
        if (!tasks || tasks.length === 0) {
            throw new Error("No tasks found");
        }
        return tasks;
    } catch (err) {
        console.error("Error fetching tasks:", err);
        throw new Error(err.message);
    }
};

exports.getTaskById = async (id) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Task ID");
    }
    
    try {
        const task = await Tasks.findById(id);
        console.log("Tasks Found in DB:", task);

        if (!task) {
            throw new Error("Task not found");
        }
        return task;
    } catch (err) {
        console.error("Error fetching task by ID:", err);
        throw new Error(err.message);
    }
};
