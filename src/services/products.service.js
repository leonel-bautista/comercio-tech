import { getAllProductsModel, getProductModel, addProductModel, deleteProductModel } from "../models/products.model.js";

export const getAllProductsService = () => {
    return new Promise(async (res, rej) => {
        try {
            const products = await getAllProductsModel();
            res(products);
        } catch (error) {
            rej();
        }
    })
}

export const getProductService = (id) => {
    return new Promise(async (res, rej) => {
        try {
            const product = await getProductModel(id);
            res(product)
        } catch (error) {
            rej();
        }
    })
}

export const addProductService = (product) => {
    return new Promise(async (res, rej) => {
        try {
            const newProduct = await addProductModel(product);
            res(newProduct);
        } catch (error) {
            rej();
        }
    })
}

export const deleteProductService = (id) => {
    return new Promise(async (res, rej) => {
        try {
            await deleteProductModel(id);
            res();
        } catch (error) {
            rej();
        }
    })
}