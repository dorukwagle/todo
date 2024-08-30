import {Request, Response, NextFunction} from "express";
import SessionRequest from "../entities/SessionRequest";
import prismaClient from "../utils/prismaClient";


const getSession = async(req: Request) => {
    const sessionCookie: string = req.cookies.sessionId;
    if (!sessionCookie) return null;

    return prismaClient.sessions.findFirst({
        where: {
            AND: [
                {
                    session: sessionCookie
                },
                {
                    expiresAt: { gte: new Date()}
                }
            ]
        }
    });
}

const authorize = async (req: SessionRequest, res: Response, next: NextFunction) => {
   const session = await getSession(req);
    if (!session) return res.status(401).json({error: "please login first"});

    req.session = session;
    next();
}

export default authorize;