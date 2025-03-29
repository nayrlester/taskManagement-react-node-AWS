const express = require('express');
const taskService = require('../controllers/task.controller.js');
const router = express.Router();

router.get('/', taskService.getAllTasks);
router.get('/:id', taskService.getTaskById);

module.exports = router;
