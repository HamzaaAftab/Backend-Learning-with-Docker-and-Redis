import express from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../controllers/todo.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();

router.route("/").post(isAuthenticated , createTodo);
router.route("/").get(getAllTodos);
router.route("/:id").get(getTodoById);
router.route("/update/:id").put(updateTodo);
router.route("/delete/:id").delete(deleteTodo);
export default router;