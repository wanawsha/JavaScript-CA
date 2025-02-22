// checkout.js
// import { updateCartCount } from './script.js';

// const cartItemsContainer = document.querySelector(".cart-items");
// const cartCount = document.getElementById('cart-count');
// const completeOrderBtn = document.querySelector('.complete-order-cta');
// const checkoutForm = document.querySelector('form');

// function showLoading() {
//     const loadingIndicator = document.getElementById('loading-indicator');
//     if (loadingIndicator) {
//         loadingIndicator.style.display = 'block';
//     }
// }

// function hideLoading() {
//     const loadingIndicator = document.getElementById('loading-indicator');
//     if (loadingIndicator) {
//         loadingIndicator.style.display = 'none';
//     }
// }

// function displayCartItems() {
//     showLoading();
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
//     if (!cartItemsContainer) return;
    
//     if (cart.length === 0) {
//         cartItemsContainer.innerHTML = `
//             <div class="empty-cart">
//                 <h2>Your Cart is Empty</h2>
//                 <a href="index.html" class="continue-shopping">Continue Shopping</a>
//             </div>
//         `;
//         hideLoading();
//         return;
//     }

//     let totalPrice = 0;
//     cartItemsContainer.innerHTML = '<h2>Your Cart:</h2>';

//     cart.forEach((item) => {
//         totalPrice += item.price;
//         cartItemsContainer.innerHTML += `
//             <div class="cart-item">
//                 <div class="in-cart">
//                     <img src="${item.image}" alt="${item.title}">
//                     <div class="item-details">
//                         <p class="item-title">${item.title} Size: ${item.size}</p>
//                         <p class="item-price">$${item.price}</p>
//                     </div>
//                     <button class="remove-item" data-id="${item.id}">Remove</button>
//                 </div>
//             </div>
//         `;
//     });

//     cartItemsContainer.innerHTML += `
//         <div class="cart-summary">
//             <p id="total-price">Total: $${totalPrice.toFixed(2)}</p>
//         </div>
//     `;

//     document.querySelectorAll('.remove-item').forEach(button => {
//         button.addEventListener('click', () => {
//             removeFromCart(button.dataset.id);
//         });
//     });

//     hideLoading(); 
// }

// function removeFromCart(productId) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart = cart.filter(item => item.id !== productId);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     displayCartItems(); 
// }

// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     if (cartCount) {
//         cartCount.textContent = cart.length;
//     }
// }

// displayCartItems();
// updateCartCount();


// checkout.js

const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.getElementById('cart-count');

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    if (!cartItemsContainer) return;

    // If cart is empty, show message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                 <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
           
        `;
        return;
    }

    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    cartItemsContainer.innerHTML = '<h2>Your Cart:</h2>';

    cart.forEach((item) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div class="in-cart">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <h3 class="item-title">${item.title}</h3>
                        <p class="item-price">$${item.price}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML += `
        <div class="cart-summary">
            <p class="total-items">Items: ${cart.length}</p>
            <p class="total-price">Total Price: $${totalPrice.toFixed(2)}</p>
        </div>
    `;

    addRemoveButtonListeners();
}

function addRemoveButtonListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    
    displayCartItems();
}

function updateCartCount() {
    if (!cartCount) return;
    cartCount.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
});

