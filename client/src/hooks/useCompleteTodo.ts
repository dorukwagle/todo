import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService from "../services/todoService";
import { TODOS_CACHE_KEY } from "../entities/constants";
import Todo from "../entities/Todo";

const useCompleteTodo = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (todo: Todo) => todoService.put('', todo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_CACHE_KEY }),
    });
}

export default useCompleteTodo;