import ModelReturnTypes from "../../entities/ModelReturnTypes";
import formatValidationErrors from "../../utils/formatValidationErrors";
import { hashPassword } from "../../utils/hash";
import prismaClient from "../../utils/prismaClient";
import User, { UserType } from "../../validations/User";

const registerUser = async (body: UserType) => {
    const res = { statusCode: 400 } as ModelReturnTypes;

    const validation = User.safeParse(body);
    const error = formatValidationErrors(validation);
    if (error) return error;

    const data = validation.data!;
    data.password = await hashPassword(data.password);

    res.data = await prismaClient.users.create({
        data,
        omit: { password: true },
    });

    res.statusCode = 200;
    return res;
};

const getUser = async (userId: string) =>
    prismaClient.users.findUnique({
        where: {
            userId,
        },
        omit: { password: true },
    });


export {
    registerUser,
    getUser
}