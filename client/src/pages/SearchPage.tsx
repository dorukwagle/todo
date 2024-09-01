import { Box, Button, Stack, TextField } from "@mui/material";
import TodoList from "../components/TodoList";
import TodoComponent from "../components/TodoComponent";
import { Search } from "@mui/icons-material";
import { useRef, useState } from "react";
import Todo from "../entities/Todo";
import useTodos from "../hooks/useTodos";
import useDeleteTodo from "../hooks/useDeleteTodo";

const SearchPage = () => {
    const seedRef = useRef<HTMLInputElement>(null);
    const [seed, setSeed] = useState("");

    const { data: todos, error } = useTodos({
        seed
    });

    const { mutate: deleteTodo } = useDeleteTodo();

    const handleSearchTodo = () => {
        if (seedRef.current?.value) 
            setSeed(seedRef.current.value);
    }
    
    const handleDeleteTodo = (todoId: string) => {
        deleteTodo(todoId);
    };

    return (
        <div>
            <TodoList status="Pending">
                        <Box
                            sx={{
                                width: "100%",
                                height: "500px",
                                overflow: "scroll",
                            }}
                        >
                            {error && (
                                <p>{error.message}</p>
                            )}
                            {todos &&
                                todos.data.map(
                                    ({ todoId, title, body }: Todo) => (
                                        <TodoComponent
                                            key={todoId}
                                            title={title}
                                            body={body}
                                            onDelete={() => handleDeleteTodo(todoId)}
                                        />
                                    )
                                )}
                            {todos && todos.data.length === 0 && (
                                <p>No matching todos</p>
                            )}
                        </Box>
                        <Stack direction={"row"} spacing={0}>
                            <Stack
                                direction="column"
                                spacing={0}
                                sx={{ width: "100%", mr: 2 }}
                            >
                                <TextField
                                    label="Search"
                                    variant="standard"
                                    size="small"
                                    inputRef={seedRef}
                                />
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleSearchTodo}
                            >
                                <Search />
                            </Button>
                        </Stack>
                        </Stack>
                    </TodoList>
        </div>
    );
};

export default SearchPage;
