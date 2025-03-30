const express = require('express');
const router = express.Router();
const taskService = require('../controllers/task.controller.js');

router.get('/', taskService.getAllTasks);
router.get('/:id', taskService.getTaskById);

module.exports = router;
