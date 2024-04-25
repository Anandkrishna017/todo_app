const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    projectId: String,
    todoTitle: String,
    todoDescription: String,
    status: {
        type: Boolean,
        default: false
    },
    date: Date
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = { Todo };
