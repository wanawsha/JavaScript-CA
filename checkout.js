// checkout.js
import { updateCartCount } from './script.js';

const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.getElementById('cart-count');
const completeOrderBtn = document.querySelector('.complete-order-cta');
const checkoutForm = document.querySelector('form');

// Show loading indicator while fetching data
function showLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
}

// Hide loading indicator after data is fetched
function hideLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Display cart items on the checkout page
function displayCartItems() {
    showLoading();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cartItemsContainer) return;
    
    // If cart is empty, show a message and a link to continue shopping
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        hideLoading();
        return;
    }

    let totalPrice = 0;
    cartItemsContainer.innerHTML = '<h2>Your Cart:</h2>';

    // Loop through each item in the cart and display it
    cart.forEach((item) => {
        totalPrice += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div class="in-cart">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <p class="item-title">${item.title} Size: ${item.size}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
    });

    // Display total price at the bottom of the cart
    cartItemsContainer.innerHTML += `
        <div class="cart-summary">
            <p id="total-price">Total: $${totalPrice.toFixed(2)}</p>
        </div>
    `;

    // Add event listeners to remove items from the cart
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.dataset.id);
        });
    });

    hideLoading(); // Hide loading after rendering cart items
}

// Remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Update the cart display
}

// Update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Initialize the checkout page by displaying cart items and updating cart count
displayCartItems();
updateCartCount();

