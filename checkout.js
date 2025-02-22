// Checkout.js
import { products } from "./products.js";

const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.getElementById('cart-count');
const completeOrderBtn = document.querySelector('.complete-order-cta');
const checkoutForm = document.querySelector('form');

function showLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
}

function hideLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

function updateCompleteOrderButton() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (completeOrderBtn) {
        if (cart.length === 0) {
            completeOrderBtn.classList.add('disabled');
            completeOrderBtn.style.pointerEvents = 'none';
            completeOrderBtn.style.opacity = '0.5';
        } else {
            completeOrderBtn.classList.remove('disabled');
            completeOrderBtn.style.pointerEvents = 'auto';
            completeOrderBtn.style.opacity = '1';
        }
    }
}

function displayCartItems() {
    showLoading();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        updateCompleteOrderButton();
        hideLoading(); 
        return;
    }

    let totalPrice = 0;
    cartItemsContainer.innerHTML = '<h2>Your Cart:</h2>';

    cart.forEach((item) => {
        totalPrice += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div class="in-cart">
                    <img src="${item.image.url}" alt="${item.image.alt}">
                    <div class="item-details">
                        <p class="item-title">${item.title}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML += `
        <div class="cart-summary">
            <p id="total-price">Total: $${totalPrice.toFixed(2)}</p>
        </div>
    `;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.dataset.id);
        });
    });

    updateCompleteOrderButton();
    hideLoading(); 
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function validateForm() {
    const inputs = document.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    const emailInput = document.getElementById('email');
    if (emailInput && !emailInput.value.includes('@')) {
        isValid = false;
        emailInput.classList.add('error');
    }

    const cardInput = document.getElementById('card-number');
    if (cardInput && cardInput.value.replace(/\s/g, '').length !== 16) {
        isValid = false;
        cardInput.classList.add('error');
    }

    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }

    return isValid;
}

if (completeOrderBtn && checkoutForm) {
    completeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        showLoading(); 
        
        setTimeout(() => { 
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before completing order.');
                hideLoading();
                return;
            }
            
            if (validateForm()) {
                const orderDetails = {
                    cart: cart,
                    customerDetails: {
                        firstName: document.getElementById('first-name').value,
                        lastName: document.getElementById('last-name').value,
                        email: document.getElementById('email').value
                    },
                    totalAmount: cart.reduce((sum, item) => sum + item.price, 0)
                };
                
                localStorage.setItem('cart', JSON.stringify([]));
                
                localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
                
                window.location.href = 'order-conf.html';
            }
            hideLoading(); 
        }, 1000); 
    });
}

displayCartItems();
updateCartCount();
updateCompleteOrderButton();
