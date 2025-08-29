const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const validateObjectId = require('../middleware/validateObjectId');
const {
  getTasks,
  createTask,
  updateTask,
  toggleComplete,
  deleteTask
} = require('../controllers/taskController');

router.get('/', asyncHandler(getTasks));
router.post('/', asyncHandler(createTask));
router.put('/:id', validateObjectId, asyncHandler(updateTask));
router.patch('/:id/complete', validateObjectId, asyncHandler(toggleComplete));
router.delete('/:id', validateObjectId, asyncHandler(deleteTask));

module.exports = router;
