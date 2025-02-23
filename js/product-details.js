// product-details.js

import { addToCart } from './script.js';

const productDetailsContainer = document.getElementById('product-details');

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

function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function getProductDetails(id) {
    const apiUrl = `https://api.noroff.dev/api/v1/rainy-days/${id}`;
    
    showLoading(); 

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        productDetailsContainer.innerHTML = '<p>Failed to load product details. Please try again later.</p>';
    } finally {
        hideLoading(); 
    }
}

function displayProductDetails(product) {
    if (!productDetailsContainer) return;

    const sizeOptions = product.sizes
    ? product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')
    : '<option value="N/A">N/A</option>';

    productDetailsContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-details-text">
            <h1>${product.title}</h1>
            <p>${product.description}</p>
            <p class="price"><strong>Price:</strong> $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    document.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
    });
}

const productId = getProductIdFromURL();
if (productId) {
    getProductDetails(productId);
}



    
