let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceContainer.innerHTML = '';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeItem(item.id); // Assuming each item has a unique 'id'
        
        itemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    totalPriceContainer.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').innerText = cartCount;
}

function removeItem(itemId) {
    // Update the cart variable
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Re-display the cart items
    updateCartCount(); // Update the cart count
}

window.onload = () => {
    updateCartCount();
    displayCartItems();
};
