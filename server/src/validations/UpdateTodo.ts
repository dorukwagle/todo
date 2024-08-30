import Todo from "./Todo";
import {z} from "zod";

const UpdateTodo = Todo.extend({
    todoId: z.string({ required_error: "todoId is required" }),
});


export type UpdateTodoType = z.infer<typeof UpdateTodo>;
export default UpdateTodo;