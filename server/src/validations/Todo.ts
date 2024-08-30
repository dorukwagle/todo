import { z } from "zod";

const Todo = z.object({
    title: z.string({ required_error: "Title is required" })
        .min(3, "Title must be at least 3 characters long"),
    body: z.string().min(3, "Body must be at least 3 characters long").optional(),
});

export type TodoType = z.infer<typeof Todo>;
export default Todo;