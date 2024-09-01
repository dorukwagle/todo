interface TodoParams {
    page: number;
    pageSize: number;
    seed?: string;
    status?: "Pending" | "Completed";
}

export default TodoParams;