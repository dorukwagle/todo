import {Express} from "express";
import cookieParser from "cookie-parser";
import auth from "../api/auth/authController";
import users from "../api/users/usersController";


const initializeRoutes = (app: Express): void => {
    app.use(cookieParser());

    app.use("/api/user", users);
    app.use("/api/auth", auth);
}

export default initializeRoutes;