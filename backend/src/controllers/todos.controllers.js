import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  console.log(req.user.id);

  const todos = database.todos.filter(todo => todo.owner === req.user.id);

  res.json({ todos });
};

export const createTask = (req, res) => {
  const todosId = database.todos[database.todos.length - 1];
  const newId = todosId ? todosId.id + 1 : 1;

  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ msg: 'El campo title es obligatorio' });
  }

  const newTask = {
    id: newId,
    title,
    completed: completed || false,
    owner: req.user.id
  };

  database.todos.push(newTask);

  res.status(201).json({ newTask });
};

export const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const indexTask = database.todos.findIndex(task => task.id === id && task.owner === req.user.id);

  if (indexTask === -1) {
    return res.status(404).json({ msg: 'Tarea no encontrada' });
  }

  if (title) database.todos[indexTask].title = title;
  if (completed !== undefined) database.todos[indexTask].completed = completed;

  return res.status(200).json({ msg: 'Tarea actualizada' });
};

export const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  const indexTask = database.todos.findIndex(task => task.id === id && task.owner === req.user.id);

  if (indexTask === -1) {
    return res.status(404).json({ msg: 'Tarea no encontrada' });
  }

  database.todos.splice(indexTask, 1);

  return res.status(200).json({ msg: 'Tarea eliminada' });
};
