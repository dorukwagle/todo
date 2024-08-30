import { z } from "zod";

const User = z.object({
    fullName: z
        .string({ required_error: "Full Name is required" })
        .refine(
            (val) => val.split(" ").length >= 2,
            "Please enter author's full name"
        ),
    username: z
        .string({ required_error: "Username is required" })
        .min(6, "Must be at least 3 characters"),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
});

export type UserType = z.infer<typeof User>;

export default User;
