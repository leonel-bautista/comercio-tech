import { db } from "../data/data.js";
import { doc, collection, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";

export function getAllProductsModel() {
    return new Promise(async (res, rej) => {
        try {
            const collectionRef = collection(db, 'products');
            const docsSnap = await getDocs(collectionRef);
            const products = [];
            docsSnap.forEach(doc => {
                const product = { id: doc.id, ...doc.data() }
                products.push(product);
            })

            res(products);
        } catch (error) {
            rej(error);
        }
    })
}

export function getProductModel(id) {
    return new Promise(async (res, rej) => {
        try {
            const productRef = doc(db, 'products', id);
            const docSnap = await getDoc(productRef);
            if (!docSnap.exists()) rej(new Error("Doc inexistente"));

            const product = { id, ...docSnap.data() };

            res(product);
        } catch (error) {
            rej(error);
        }
    })
}

export function addProductModel(product) {
    return new Promise(async (res, rej) => {
        try {
            const collectionRef = collection(db, 'products');
            const docSnap = await addDoc(collectionRef, product);
            const newProduct = { id: docSnap.id, ...product };

            res(newProduct);
        } catch (error) {
            rej(error);
        }
    })
}

export function deleteProductModel(id) {
    return new Promise(async (res, rej) => {
        try {
            const productRef = doc(db, 'products', id);
            const docSnap = await getDoc(productRef);
            if (!docSnap.exists()) rej(new Error("Doc inexistente"))

            await deleteDoc(productRef);

            res();
        } catch (error) {
            rej(error);
        }
    })
}