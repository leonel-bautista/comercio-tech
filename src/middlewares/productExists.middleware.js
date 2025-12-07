import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getProductService } from '../services/products.service.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const productExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await getProductService(id);
        if (!product) {
            const notFoundPath = path.join(__dirname, '../../public', 'views', '404.html');
            return res.status(404).sendFile(notFoundPath);
        }

        next();
    } catch (error) {
        const notFoundPath = path.join(__dirname, '../../public', 'views', '404.html');
        return res.status(404).sendFile(notFoundPath);
    }
}