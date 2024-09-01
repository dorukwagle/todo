import { z } from "zod";

const TodoParams = z.object({
    page: z.coerce.number().min(1).optional(),
    pageSize: z.coerce
        .number()
        .min(3, "Page size must be at least 3")
        .optional(),
    seed: z.string().optional(),
    status: z.enum(["Pending", "Completed"]).optional(),
});

export type TodoParamsType = z.infer<typeof TodoParams>;
export default TodoParams;
