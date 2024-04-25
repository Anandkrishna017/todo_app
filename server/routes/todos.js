const router = require("express").Router();
const { Todo } = require("../models/todo");

router.post('/', async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const newTodo = new Todo({
      projectId: id,
      todoTitle: title,
      todoDescription: description,
      date: new Date()
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { id } = req.query;
    const todos = await Todo.find({ projectId: id });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully', deletedTodo });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const todoId = req.params.id;
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, { todoTitle: title, todoDescription: description, date: new Date() }, { new: true });
    await todo.save();
    res.status(200).json({ message: 'Todo item updated successfully', todo: todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/updateCheckbox/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isChecked } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, { status: isChecked }, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Checkbox status updated successfully', todo });
  } catch (error) {
    console.error('Error updating checkbox status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;