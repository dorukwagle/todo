import APIClient from "./apiClient";
import User from "../entities/User";

const userService = new APIClient<User, User>("/user");

export default userService;
