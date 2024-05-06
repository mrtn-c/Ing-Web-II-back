import {z} from "zod";

const emailSchema = z.string().email({"message": "Invalid email format"});
const passwordSchema = z.string().min(8, {"message": "Password must be at least 8 characters long"});
const nameSchema = z.string();
const lastnameSchema = z.string();
const dniSchema = z.number();

const authBody = z.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    lastname: lastnameSchema,
    dni: dniSchema
})

const authLoginBody = z.object({
    email: emailSchema,
    password: passwordSchema
});

export const authLoginSchema = z.object({
    body: authLoginBody
})

export const authSchema = z.object({
    body: authBody
});


/*
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user User @relation(fields: [userId], references: [id])
  userId String @unique
 */ 