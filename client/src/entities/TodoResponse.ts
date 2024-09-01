import Todo from "./Todo";

interface Info {
    hasNextPage: boolean;
    itemsCount: number;
}

interface TodoResponse {
    data: Todo[];
    info: Info;   
}

export default TodoResponse;