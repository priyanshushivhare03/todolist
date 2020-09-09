const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const TodoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  createdAt: Date
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = { mongoose, Todo };