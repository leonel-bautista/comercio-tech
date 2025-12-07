const productsList = document.querySelector('#products-list');

const URL = 'https://comercio-tech.vercel.app';

async function getAllProducts() {
    try {
        const res = await fetch(`${URL}/api/products`)
        if (!res.ok) return null;
        const products = await res.json();

        return products;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function loadProductsList() {
    const products = await getAllProducts();
    if (!products) return;

    const stockInfo = (stock) => {
        return stock > 0 ? { status: 'has-stock', label: 'hay stock' }
                         : { status: 'no-stock', label: 'sin stock' }
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price)
    }

    products.forEach(product => {
        const { status, label } = stockInfo(product.stock);
        const formattedPrice = formatPrice(product.precio);

        productsList.innerHTML += `
            <a href="/productos/${product.id}" class="product-card">
                <div class="card-header">
                    <img src="${product.imagen}" alt="${product.nombre}">
                </div>
                <div class="card-body">
                    <span class="product-stock ${status}">${label}</span>
                    <h3 class="product-title">${product.nombre}</h3>
                    <h2 class="product-price">${formattedPrice}</h2>
                </div>
            </a>
        `
    })
}

document.addEventListener('DOMContentLoaded', loadProductsList);