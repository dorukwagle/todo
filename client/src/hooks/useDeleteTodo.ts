import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService from "../services/todoService";
import { TODOS_CACHE_KEY } from "../entities/constants";

const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: number | string) => todoService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_CACHE_KEY }),
    });
}

export default useDeleteTodo;