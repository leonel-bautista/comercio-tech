import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import productsRoutes from './src/routes/products.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import { productExists } from './src/middlewares/productExists.middleware.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;
const { URL } = process.env;
const corsConfig = {
    origin: URL,
    methods: [ 'GET', 'POST', 'DELETE' ],
    allowedHeaders: [ 'Content-Type', 'Authorization' ],
    exposedHeaders: [ 'Content-Length' ],
    credentials: true,
    maxAge: 600,
    optionSuccessStatus: 204,
}

app.use((req, res, next) => {
    console.log(`Datos recibidos por: ${req.method} ${req.url}`);
    next();
})

app.use(express.json());
app.use(cors(corsConfig));
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS API
app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

// RUTAS FRONT
app.get('/', (req, res) => {
    const homePath = path.join(__dirname, 'public', 'views', 'home.html');
    res.sendFile(homePath);
})
app.get('/productos', (req, res) => {
    const productsListPath = path.join(__dirname, 'public', 'views', 'productsList.html');
    res.sendFile(productsListPath);
})
app.get('/productos/:id', productExists, (req, res) => {
    const productPath = path.join(__dirname, 'public', 'views', 'product.html');
    res.sendFile(productPath);
})
app.get('/docs', (req, res) => {
    const docsPath = path.join(__dirname, 'public', 'views', 'docs.html');
    res.sendFile(docsPath);
})

// MIDDLEWARE ERROR 404
app.use((req, res, next) => {
    const unknownPage = path.join(__dirname, 'public', 'views', '404.html');
    res.status(404).sendFile(unknownPage);
})

app.listen(PORT, () => {
    console.log(`Servidor abierto: ${URL} `)
})