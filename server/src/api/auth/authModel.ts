import { Sessions } from "@prisma/client";
import { comparePassword } from "../../utils/hash";
import { v7 as uuidV7 } from "uuid";
import type { Users } from "@prisma/client";
import prismaClient from "../../utils/prismaClient";


interface CustomUser extends Omit<Users, 'password'> {
    password?: string;
}

const getUser = async (username: string) => {
    const user = await prismaClient.users.findUnique({
        where: {
            username
        }
    });

    return user as CustomUser | null;
}

const authenticate = async (username: string, password: string): Promise<CustomUser | null> => {
    const user = await getUser(username);

    if (!user) return null;

    if (!await comparePassword(password, (user.password || ''))) return null;
    delete user.password;
    return user;
}

const createSession = async (user: Omit<Users, "password">): Promise<string> => {
    const userInfo = await prismaClient.users.findUnique({
        where: {
            userId: user.userId
        }
    });

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 5); // 5 days validity

    const session = await  prismaClient.sessions.create({
       data: {
           userId: userInfo!.userId,
           session: uuidV7(),
           expiresAt: expiryDate
       }
    });

    return session.session;
}

const destroySession = async (session: Sessions): Promise<boolean> => {
    await prismaClient.sessions.delete({
        where: {
            sessionId: session.sessionId
        }
    })
    return true;
}

const destroyAllSessions = async (session: Sessions) => {
    await prismaClient.sessions.deleteMany({
        where: {
            userId: session.userId
        }
    });
    return true;
}

export { authenticate, createSession, destroySession, destroyAllSessions};