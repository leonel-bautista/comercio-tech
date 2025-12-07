import 'dotenv/config'
import jwt from 'jsonwebtoken'

const { SECRET_KEY } = process.env;

export const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (error) => {
        if (error) return res.sendStatus(401);
        next();
    })
}