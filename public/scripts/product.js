const pageTitle = document.querySelector('title');
const productContainer = document.querySelector('section#product-info');

const URL = 'https://comercio-tech.vercel.app';
const path = window.location.pathname;
const productPathId = path.split("/")[2];

async function getProduct(id) {
    try {
        const res = await fetch(`${URL}/api/products/${id}`);
        if (!res.ok) return null;
        const product = await res.json();

        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function loadProduct() {
    const product = await getProduct(productPathId);
    if (!product) return;

    pageTitle.innerText = `${product.nombre} | Comercio Tech`;

    const stockInfo = (stock) => {
        return stock > 0 ? { status: 'has-stock', amount: stock }
                         : { status: 'no-stock', amount: 0 }
    }
    const { status, amount } = stockInfo(product.stock);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price)
    }
    const formattedPrice = formatPrice(product.precio);

    const placeCategories = (categories) => {
        return categories.map(category => `<span class="category">${category}</span>`).join('');
    }
    const cat = placeCategories(product.categorias) || '';

    productContainer.innerHTML = `
        <div class="product-card">
            <div class="card-aside">
                <img src="${product.imagen}" alt="${product.nombre}">
            </div>
            <div class="card-body">
                <h3 class="product-title">${product.nombre}</h3>
                <div class="product-categories">${cat}</div>
                <h2 class="product-price">${formattedPrice}</h2>
                <div class="product-stock">
                    <h4 class="${status}">Cantidad: <span>${amount}</span></h4>
                    <button type="button" id="buy-btn" class="${status}">Comprar ahora</button>
                </div>
                <div class="product-description">
                    <h4>Sobre este artículo</h4>
                    <p>${product.descripcion}</p>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadProduct)