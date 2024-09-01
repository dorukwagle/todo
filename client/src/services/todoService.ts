import Todo from "../entities/Todo";
import TodoParams from "../entities/TodoParams";
import TodoResponse from "../entities/TodoResponse";
import APIClient from "./apiClient";

const todoService = new APIClient<TodoResponse, Todo, TodoParams>("/todos");

export default todoService;