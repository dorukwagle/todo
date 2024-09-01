
interface Todo {
    todoId: string;
    title: string;
    body: string;
    status: "Pending" | "Completed";
}

export default Todo;