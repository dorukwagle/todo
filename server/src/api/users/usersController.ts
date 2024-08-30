import express from "express";
import { getUser, registerUser } from "./usersModel";
import authorize from "../../middlewares/auth";
import SessionRequest from "../../entities/SessionRequest";


const users = express.Router();

users.post("/register", async (req, res) => {
    const {error, statusCode, data} = await registerUser(req.body);
    res.status(statusCode).json({error, data});
});

users.get("/me", authorize, async (req: SessionRequest, res) => 
   res.json(await getUser(req.session!.userId)));

export default users;