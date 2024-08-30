import {Express} from "express";
import cookieParser from "cookie-parser";
import auth from "../api/auth/authController";
import users from "../api/users/usersController";
import authorize from "../middlewares/auth";
import todos from "../api/todos/todosController";


const initializeRoutes = (app: Express): void => {
    app.use(cookieParser());

    app.use("/api/user", users);
    app.use("/api/auth", auth);
    app.use("/api/todos", authorize, todos);
}

export default initializeRoutes;