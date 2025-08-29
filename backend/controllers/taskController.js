const Task = require('../models/Task');

// GET /api/tasks
async function getTasks(req, res) {
  const { q, priority, completed, sortBy = 'dueDate', order = 'asc' } = req.query;
  const filter = {};

  if (q) {
    const regex = new RegExp(q, 'i');
    filter.$or = [{ title: regex }, { description: regex }];
  }
  if (priority) filter.priority = priority;
  if (completed === 'true') filter.completed = true;
  if (completed === 'false') filter.completed = false;

  const sort = {};
  const allowedSort = ['dueDate', 'priority', 'createdAt', 'updatedAt', 'title'];
  const dir = order === 'desc' ? -1 : 1;
  if (allowedSort.includes(sortBy)) sort[sortBy] = dir;

  const tasks = await Task.find(filter).sort(sort);
  res.json(tasks);
}

// POST /api/tasks
async function createTask(req, res) {
  const { title, description, priority, dueDate } = req.body;
  const task = new Task({ title, description, priority, dueDate });
  await task.save();
  res.status(201).json(task);
}

// PUT /api/tasks/:id
async function updateTask(req, res) {
  const { id } = req.params;
  const allowed = ['title', 'description', 'priority', 'dueDate', 'completed'];
  const updates = {};
  for (const key of allowed) if (key in req.body) updates[key] = req.body[key];

  const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
}

// PATCH /api/tasks/:id/complete
async function toggleComplete(req, res) {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
}

// DELETE /api/tasks/:id
async function deleteTask(req, res) {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(204).end();
}

module.exports = { getTasks, createTask, updateTask, toggleComplete, deleteTask };
