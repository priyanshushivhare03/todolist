var express = require('express');
var debug = require('debug')('todo:app');
const { Todo } = require('../database');

const router = express.Router();

router.get('/list', async function(req, res) {
  debug('Fetching list of todos');
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/add', async function(req, res) {
  try {
    debug('Creating new todo');
    const todo = new Todo({ ...req.body, createdAt: new Date() });
    debug(`New todo: ${todo._id}`);
    debug('Validating new todo');
    await todo.validate();

    debug('Saving new todo to database');
    await todo.save();

    debug('Scheduling delete job');

    setTimeout(async function() {
      debug(`Deleting todo with id "${todo._id}"`);
      const res = await Todo.findByIdAndDelete(todo._id);
      debug(`Deleted todo ${res._id}`);
    }, (todo.duration * 60 * 1000));

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid fields');
  }
});

module.exports = router;