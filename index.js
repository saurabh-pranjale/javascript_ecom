const cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').innerText = cartCount;
}

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-id', product.id);

        const isInCart = cart.some(item => item.id === product.id);
        const buttonText = isInCart ? 'Remove from Cart' : 'Add to Cart';

        productDiv.innerHTML = `
            <section class="d-flex flex-column justify-content-around align-items-center"
            style="height: max-content;width: 250px;border: 2px solid black;">
                <h2 class="my-2">${product.title}</h2>
                <p>Price: $${product.price}</p>
                <img src="${product.image}" alt="${product.title}" style="height: 180px;" />
                <button class="cart-toggle my-2">${buttonText}</button>
            </section>
        `;
        productList.appendChild(productDiv);

       
        productDiv.querySelector('.cart-toggle').addEventListener('click', () => {
         
            const isInCartNow = cart.some(item => item.id === product.id);
            if (isInCartNow) {
         
                const itemIndex = cart.findIndex(item => item.id === product.id);
                cart.splice(itemIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                productDiv.querySelector('.cart-toggle').innerText = 'Add to Cart';
            } else {
       
                const cartItem = {
                    id: product.id,
                    name: product.title,
                    price: product.price
                };
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));
                productDiv.querySelector('.cart-toggle').innerText = 'Remove from Cart';
            }
        
            updateCartCount();
        });
    });
}

window.onload = () => {
    updateCartCount();
    fetchProducts();
};
