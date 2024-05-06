import prisma from "../db/prisma";
import type { User } from "@prisma/client";

//definicion de tipos para el usuario
type CreateUserType = Pick<User, "name" | "lastname" | "dni"> //Pick<T, K>: Crea un nuevo tipo que incluye solo las propiedades especificadas K de un tipo T
type UpdateUserType = Partial<User>
type GetUserType = Pick<User, "id">
type GetUserByNameType = Pick<User, "dni">

export const createUser = async (user: CreateUserType) => {
    
    return await prisma.user.create({
      data: user,
    });
};

export const getUser = async (user: GetUserType) => {
    return await prisma.user.findUnique({
      where: user,
    });
}

export const updateUser = async (user: GetUserType, updatedUser: UpdateUserType) => {
    return await prisma.user.update({
      where: user,
      data: updatedUser,
    });
}

export const getUserByName = async (user: GetUserByNameType) => {
    return await prisma.user.findUnique({
      where: user,
    });
}

export const deleteUser = async (user: GetUserType) => {
    return await prisma.user.delete({
      where: user,
    });
}



