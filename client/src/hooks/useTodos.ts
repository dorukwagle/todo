import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todoService";
import { DAY } from "../entities/constants";
import { AxiosError } from "axios";
import TodoResponse from "../entities/TodoResponse";
import TodoParams from "../entities/TodoParams";
import Todo from "../entities/Todo";


interface Params {
    seed?: string;
    status?: "Pending" | "Completed";
}

const useTodos = ({seed, status}: Params) => {

    const params: TodoParams = {
        page: 1,
        pageSize: 15,
        seed,
        status
    };

    return useQuery<TodoResponse, AxiosError>({
        queryKey: ["todos", params],
        queryFn: () => todoService.get('', params),
        staleTime: DAY,
    });
}

export default useTodos;