import { useMutation, useQueryClient } from "@tanstack/react-query";
import Todo from "../entities/Todo";
import todoService from "../services/todoService";
import { TODOS_CACHE_KEY } from "../entities/constants";


const useAddTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: Todo) => todoService.post(todo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_CACHE_KEY }),
    });
}

export default useAddTodo;