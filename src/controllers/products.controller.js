import { addProductService, deleteProductService, getAllProductsService, getProductService } from "../services/products.service.js";

export async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsService();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function getProductById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID inválido" });

        const product = await getProductService(id);
        if (!product) return res.status(404).json({ message: "Producto inexistente" });

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function addProduct(req, res) {
    try {
        const productInfo = req.body;
        if (!productInfo) return res.status(400).json({ message: "Datos de producto inválidos" });

        const product = await addProductService(productInfo);

        return res.status(200).json({ message: "Producto agregado con éxito", product });
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID inválido" });

        await deleteProductService(id);

        return res.status(200).json({ message: "Producto eliminado con éxito", id });
    } catch (error) {
        return res.status(400).json(error);
    }
}