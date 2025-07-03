const express = require('express');
const openDB = require('../db/db.js');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const {
			page = 1,
			limit = 3,
			sortBy = 'name',
			order = 'asc',
		} = req.query;
	
		const validSortFields = ['name', 'email', 'completed']
		const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
		const sortOrder = order === 'desc' ? 'DESC' : 'ASC'
		const offset = (parseInt(page) - 1) * parseInt(limit)

		const db = await openDB();
		const count = await db.get('SELECT COUNT(*) AS count FROM todos');
		const todos = await db.all(`SELECT * FROM todos ORDER BY ${sortField} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`);

		res.status(200).json({
    		total: count.count,
    		page: parseInt(page),
    		todos: todos.map(t => ({ ...t, completed: !!t.completed }))
  		})
	
	} catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {
  const { name, email, title } = req.body;
  try {
    const db = await openDB();
    await db.run('INSERT INTO todos (name, email, title, completed, edited) VALUES (?, ?, ?, 0, 0)', [name, email, title]);
    res.status(201).json({ message: 'Task added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/toggle', async (req, res) => {
  const { completed } = req.body;
  try {
    const db = await openDB();
    const result = await db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, parseInt(req.params.id)]);
    if (result.changes) {
      res.status(200).json({ message: 'Task updated' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/edit', async (req, res) => {
  const { title } = req.body;
  try {
    const db = await openDB();
    const result = await db.run('UPDATE todos SET title = ?, edited = 1 WHERE id = ?', [title, parseInt(req.params.id)]);
    if (result.changes) {
      res.status(200).json({ message: 'Task updated' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
