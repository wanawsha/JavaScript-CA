// import { products } from "./products.js";

// const productsContainer = document.querySelector(".products-container");
// const itemsInCart = document.querySelector(".cart-items");
// const cartCount = document.getElementById('cart-count'); 

// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function showProducts(products) {
//     productsContainer.innerHTML = ''; // Clear existing products
//     products.forEach((product) => {
//         productsContainer.innerHTML += `
//     <div class="products-container">
//          <div class="product-card">
//                 <div class="product-img">
//                     <img src="${product.image.url}" alt="${product.alt}">
//                 </div>
//                 <div class="product-details">
//                     <h2>${product.title}</h2>
//                     <h2><small>$</small>${product.price}</h2>
//                 </div>
//                 <div class="add-to-cart" data-id="${product.id}">Add to cart</div>
//                <a href="./product-details.html?id=${product.id}">VIEW DETAILS</a>
//             </div>
//         </div>`;
//     });

//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', () => {
//             const productId = button.getAttribute('data-id');
//             addToCart(productId); 
//         });
//     });
// }

// showProducts(products);

// function addToCart(id) {
//     let item;

//     if (cart.some((item) => item.id === id)) {
//         alert("This product is already in the cart!");
//     } else {
//         item = products.find((product) => product.id === id); 
//     } 
//     if (item) {
//         cart.push(item);
//         localStorage.setItem('cart', JSON.stringify(cart)); 
//         updateCartCount(); 
//     }
// }

// function updateCartCount() {
//     cartCount.textContent = cart.length; 
// }

// function showCartItems() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || []; 
//     itemsInCart.innerHTML = "";
//     if (cart.length === 0) {
//         itemsInCart.innerHTML = "<p>Your cart is empty.</p>";
//     } else {
//         cart.forEach((item) => {
//             itemsInCart.innerHTML += `
//             <div class="cart-item">
//                 <div class="in-cart">
//                     <img src="${item.image.url}" alt="${item.alt}">
//                     <p>${item.title}</p>
//                     <small>$</small>${item.price}
//                 </div>
//             </div>`;
//         });
//     }
// }

// updateCartCount();

// showCartItems();

import { products } from "./products.js";

const productsContainer = document.querySelector(".products-container");
const cartCount = document.getElementById('cart-count');
const filterContainer = document.querySelector(".filter-container select");

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

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showProducts(productsToShow) {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = ''; 
    
    productsToShow.forEach((product) => {
        productsContainer.innerHTML += `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image.url}" alt="${product.alt}">
            </div>
            <div class="product-details">
                <h2>${product.title}</h2>
                <h2><small>$</small>${product.price}</h2>
            </div>
            <div class="add-to-cart" data-id="${product.id}">Add to cart</div>
            <a href="./product-details.html?id=${product.id}">VIEW DETAILS</a>
        </div>`;
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            addToCart(productId);
        });
    });

    hideLoading(); 
}

function filterProducts() {
    showLoading(); 
    const selectedGender = filterContainer.value;
    console.log('Selected gender:', selectedGender);
    
    if (selectedGender === 'all') {
        showProducts(products);
    } else {
        const filteredProducts = products.filter(product => 
            product.gender === selectedGender
        );
        console.log('Filtered products:', filteredProducts);
        showProducts(filteredProducts);
    }
}

function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        alert("This product is already in the cart!");
        return;
    }

    const item = products.find((product) => product.id === id);
    if (item) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

function updateCartCount() {
    if (!cartCount) return;
    cartCount.textContent = cart.length;
}

showLoading();
showProducts(products);
updateCartCount();

if (filterContainer) {
    filterContainer.addEventListener('change', filterProducts);
    console.log('Filter event listener added');
} else {
    console.log('Filter container not found');
}



