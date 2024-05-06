import { Router } from "express";
import { createAuth, getAuth } from "../controllers/auth.controller";
import { createUser } from "../controllers/user.controller";
import { authSchema, authLoginSchema } from "../schema/auth.schema";
import { zParse } from "../schema";

const router = Router();

router.route('/create').post(async (req, res, next) => {
    try {
        const { name, lastname, email, password, dni } = req.body;
        const { body } = await zParse(authSchema, req);
        const user = await createUser({ name, lastname, dni });
        const auth = await createAuth({
            email,
            password,
            userId: user.id
        });
        return res.status(201).json({
            user,
            auth
        });
    } catch (error) {
        next(error);
    }
});

router.route('/login').post(async (req, res, next) => {
    try {

        const { body } = await zParse(authLoginSchema, req);
        const login = await getAuth(body);
        if (login === 404) {
            return res.status(404).json({
                "message": "User not found"
            });
        } else if (login === 401) {
            return res.status(401).json({
                "message": "Password is incorrect"
            });
        }
        
        // Suponiendo que userExist es un objeto que contiene la contraseña

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = login.userExist;

        return res.status(200).json({
            user: userWithoutPassword,
            token: login.token
        });
        
    } catch (error) {
        next(error);
    }
});

export default router;

// model User {
//     id        Int   @id @default(autoincrement())
//     name      String?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     auth      Auth?
  
//     }
  
//   model Auth {
//     id        String   @id @default(cuid())
//     email     String   @unique
//     password  String
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     user User @relation(fields: [userId], references: [id])
//     userId Int @unique
//   }