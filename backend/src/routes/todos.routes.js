import { Router } from "express";
import { getAllTodosCtrl, createTask, updateTask, deleteTask } from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJwt, getAllTodosCtrl);
todosRouter.post("/", validarJwt, createTask);
todosRouter.put('/:id', validarJwt, updateTask);
todosRouter.delete('/:id', validarJwt, deleteTask)

export { todosRouter };
