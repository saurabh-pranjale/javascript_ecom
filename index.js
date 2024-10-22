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
        productDiv.innerHTML = `
           <section class="d-flex flex-column justify-content-around align-items-center"
        style="height: max-content;width: 250px;border: 2px solid black;">
        <h2 class="my-2">${product.title}</h2>
        <p>Price: $${product.price}</p>
        <img src="${product.image}" alt="${product.title}" style="height: 180px;" />
        <button class="add-to-cart my-2">Add to Cart</button>
    </section>
        `;
        productList.appendChild(productDiv);


        productDiv.querySelector('.add-to-cart').addEventListener('click', () => {
            const cartItem = {
                id: product.id,
                name: product.title,
                price: product.price
            };
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });
}


window.onload = () => {
    updateCartCount();
    fetchProducts();
};
