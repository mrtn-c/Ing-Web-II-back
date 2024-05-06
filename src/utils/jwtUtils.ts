import jwt, { Secret } from 'jsonwebtoken';

export const generateAccessToken = (email: string) => {
    const secret: Secret = process.env.SECRET || ""; // Set a default value for SECRET if it is undefined
    return jwt.sign({ email }, secret, { expiresIn: "1800s" });
}