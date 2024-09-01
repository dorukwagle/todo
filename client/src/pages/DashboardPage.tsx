import { Box, Button, Fab, Stack, TextField } from "@mui/material";
import TodoList from "../components/TodoList";
import TodoComponent from "../components/TodoComponent";
import { Save, Search } from "@mui/icons-material";
import { useRef } from "react";
import Todo from "../entities/Todo";
import useAddTodo from "../hooks/useAddTodo";
import useTodos from "../hooks/useTodos";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useCompleteTodo from "../hooks/useCompleteTodo";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

    const { data: completedTodos, error: completedTodosError } = useTodos({
        status: "Completed",
    });
    const { data: pendingTodos, error: pendingTodosError } = useTodos({
        status: "Pending",
    });
    const { mutate: deleteTodo } = useDeleteTodo();
    const { mutate: updateTodo } = useCompleteTodo();

    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLInputElement>(null);

    const { mutate: createTodo } = useAddTodo();

    const handleDeleteTodo = (todoId: string) => {
        deleteTodo(todoId);
    };

    const handleCompleteTodo = (todoId: string, title: string, body: string) => {
        updateTodo({ todoId, title, body, status: "Completed" });
    };

    const handleSubmitTodo = () => {
        if (!(titleRef.current?.value && bodyRef.current?.value)) return;

        const todo: Todo = {
            todoId: "",
            title: titleRef.current.value,
            body: bodyRef.current.value,
            status: "Pending",
        };

        createTodo(todo);
    };

    return (
        <Box sx={{ display: "block", height: "100%" }}>
            {/* <Container> */}
            <Stack
                direction={"row"}
                spacing={5}
                sx={{
                    width: "100%",
                    height: "100%",
                    flexWrap: "wrap",
                    ml: 2,
                    mt: 2,
                }}
                useFlexGap
            >
                <TodoList status="Pending">
                    <Box
                        sx={{
                            width: "100%",
                            height: "500px",
                            overflow: "scroll",
                        }}
                    >
                        {pendingTodosError && (
                            <p>{pendingTodosError.message}</p>
                        )}
                        {pendingTodos &&
                            pendingTodos.data.map(
                                ({ todoId, title, body }: Todo) => (
                                    <TodoComponent
                                        key={todoId}
                                        title={title}
                                        body={body}
                                        onDelete={() => handleDeleteTodo(todoId)}
                                        onCompleteClicked={() =>
                                            handleCompleteTodo(todoId, title, body)
                                        }
                                        options
                                    />
                                )
                            )}
                        {pendingTodos && pendingTodos.data.length === 0 && (
                            <p>No pending todos</p>
                        )}
                    </Box>
                    <Stack direction={"row"} spacing={0}>
                        <Stack
                            direction="column"
                            spacing={0}
                            sx={{ width: "100%", mr: 2 }}
                        >
                            <TextField
                                label="Title"
                                variant="standard"
                                size="small"
                                inputRef={titleRef}
                            />
                            <TextField
                                label="Body"
                                variant="standard"
                                size="small"
                                inputRef={bodyRef}
                            />
                        </Stack>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmitTodo}
                        >
                            <Save />
                        </Button>
                    </Stack>
                </TodoList>
                <TodoList status="Completed">
                    <Box
                        sx={{
                            width: "100%",
                            height: "500px",
                            overflow: "scroll",
                        }}
                    >
                        {completedTodosError && (
                            <p>{completedTodosError.message}</p>
                        )}
                        {completedTodos &&
                            completedTodos.data.map(
                                ({ todoId, title, body }: Todo) => (
                                    <TodoComponent
                                        key={todoId}
                                        title={title}
                                        body={body}
                                        onDelete={() => handleDeleteTodo(todoId)}
                                    />
                                )
                            )}
                        {completedTodos && completedTodos.data.length === 0 && (
                            <p>No completed todos</p>
                        )}
                    </Box>
                </TodoList>
            </Stack>
            {/* </Container> */}
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 100 }}
                onClick={() => navigate("/search")}
            >
                <Search />
            </Fab>
        </Box>
    );
};

export default DashboardPage;
