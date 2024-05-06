import prisma from "../db/prisma";
import { hashPassword, comparePassword } from "../utils/bcryptUtils";
import { generateAccessToken } from "../utils/jwtUtils";
import type { Auth, User } from "@prisma/client";

type CreateAuthType = Pick<Auth, "email" | "password" |  "userId">;
type UpdateAuthType = Partial<Auth>; //Change Password
type getAuthType = Pick<Auth, "email" | "password">;

export const createAuth = async (auth: CreateAuthType) => {
    const passwordCrypted = await hashPassword(auth.password);
    return await prisma.auth.create({
        data: {
            email: auth.email,
            password: passwordCrypted,
            user: { connect: { id: auth.userId } }
        }
    });
};

export const getAuth = async (auth: getAuthType) => {
    const userExist = await prisma.auth.findUnique({
        where: { email: auth.email },
    });

    if (userExist === null) {
        return 404; // Case when the email is not found.
    }

    if (await comparePassword(auth.password, userExist.password)){
        return {userExist, token: generateAccessToken(userExist.email)};
    } else {
        return 401; // Case when the password is not correct.
    }
};

export const updateAuth = async (auth: getAuthType, updatedAuth: UpdateAuthType) => {
    const passwordCrypted = await hashPassword(updatedAuth.password);
    return await prisma.auth.update({
        where: auth,
        data: {
            password: passwordCrypted
        }
    });
};