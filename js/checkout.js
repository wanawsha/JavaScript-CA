// checkout.js
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.getElementById('cart-count');
const completeOrderButton = document.getElementById('complete-order-cta');
const orderForm = document.getElementById('form');
const formContainer = document.querySelector('.form-container'); 


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'flex'; 
    }
}


function hideLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

function displayCartItems() {
    showLoading(); 

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        hideOrderForm(); 
        hideLoading(); 
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
    showOrderForm(); 
    hideLoading(); 
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

function isFormValid() {
    const requiredFields = orderForm.querySelectorAll('input[required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            return false; 
        }
    }
    return true;
}


function resetCart() {
    localStorage.removeItem('cart');
    cart = [];
    updateCartCount();
    displayCartItems();
}

function handleCompleteOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to the cart.');
        return;
    }

    if (!isFormValid()) {
        alert('Please fill in all required fields.');
        return;
    }

    resetCart();
    window.location.href = 'order-confirmation.html';
}


function hideOrderForm() {
    if (formContainer) {
        formContainer.style.display = 'none';
    }
}

function showOrderForm() {
    if (formContainer) {
        formContainer.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();

    if (completeOrderButton) {
        completeOrderButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleCompleteOrder();
        });
    }
});



