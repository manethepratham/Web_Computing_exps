import express from 'express';

const router = express.Router();

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// GET all users
router.get('/users', (req, res) => res.json(users));

// POST new user
router.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.json(newUser);
});

// PUT update user
router.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.map(user => (user.id === id ? { ...user, ...req.body } : user));
  res.json(users.find(user => user.id === id));
});

// DELETE a user
router.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.send(`User with id ${id} deleted`);
});

export default router;