import 'dotenv/config'
import jwt from 'jsonwebtoken'

const { SECRET_KEY, TOKEN_EXPIRATION } = process.env;

export const generateToken = (userData) => {
    const user = { id: userData.id, email: userData.email };
    const expiration = { expiresIn: TOKEN_EXPIRATION }

    return jwt.sign(user, SECRET_KEY, expiration);
}