import express from "express";
import { createTodo, deleteTodo, paginateTodos, updateTodo } from "./todosModel";
import SessionRequest from "../../entities/SessionRequest";
import { TodoParamsType } from "../../validations/TodoParams";


const todos = express.Router();

todos.post("/", async (req: SessionRequest, res) => {
    const {error, statusCode, data} = await createTodo(req.session!.userId, req.body);
    res.status(statusCode).json(error || data);
});

todos.put("/", async (req: SessionRequest, res) => {
    const {error, statusCode, data} = await updateTodo(req.session!.userId, req.body);
    res.status(statusCode).json(error || data);
});

todos.delete("/:todoId", async (req: SessionRequest<{todoId: string}>, res) => {
    await deleteTodo(req.session!.userId, req.params.todoId);

    res.status(200).end();
});

todos.get("/", async (req: SessionRequest<{}, any, any, TodoParamsType>, res) => {
    const {error, statusCode, data, info } = await paginateTodos(req.session!.userId, req.query);
    res.status(statusCode).json(error ? error : {data, info});
});

export default todos;