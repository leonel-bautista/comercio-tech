import { generateToken } from "../data/token.js";

const { DEFAULT_EMAIL, DEFAULT_PASSWORD } = process.env;

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Credenciales inválidas" });
        if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) return res.status(401).json({ message: "Email y/o contraseña incorrectos. Vuelva a intentarlo." })

        const user = { id: "123", email };
        const token = await generateToken(user);

        return res.status(200).json({ message: "Inicio de sesión con éxito", token });
    } catch (error) {
        return res.status(400).json(error);
    }
}