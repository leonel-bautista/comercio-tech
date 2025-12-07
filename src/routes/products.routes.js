import express from 'express'

import * as controller from '../controllers/products.controller.js'
import { authentication } from '../middlewares/authentication.middleware.js';

const routes = express.Router();

routes.get('/', controller.getAllProducts);
routes.get('/:id', controller.getProductById);
routes.post('/create', authentication, controller.addProduct);
routes.delete('/:id', authentication, controller.deleteProduct);

export default routes