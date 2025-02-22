

//Script.js
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

export async function fetchProducts() {
    showLoading();
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
        const products = await response.json();
        showProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        productsContainer.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    } finally {
        hideLoading();
    }
}

function showProducts(productsToShow) {
    if (!productsContainer) return;

    productsContainer.innerHTML = ''; 
    
    productsToShow.forEach((product) => {
        productsContainer.innerHTML += `
            <div class="product-item">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
                <a href="product-details.html?id=${product.id}">VIEW DETAILS</a>
            </div>
        `;
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            addToCart(productId);
        });
    });

    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            window.location.href = `product-details.html?id=${productId}`;  // Navigate to product details page
        });
    });
    
    hideLoading();
}

async function fetchSingleProduct(id) {
    try {
        const response = await fetch(`https://api.noroff.dev/api/v1/rainy-days/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

function filterProducts() {
    showLoading();
    const selectedGender = filterContainer.value;

    fetchProducts().then(products => {
        if (selectedGender === 'all') {
            showProducts(products);
        } else {
            const filteredProducts = products.filter(product => 
                product.gender === selectedGender
            );
            showProducts(filteredProducts);
        }
    });
}

export function addToCart(id) {
    fetchSingleProduct(id).then(product => {
        if (!product) return;
        
        if (cart.some((item) => item.id === id)) {
            alert("This product is already in the cart!");
            return;
        }

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });
}

export function updateCartCount() {
    if (!cartCount) return;
    cartCount.textContent = cart.length;
}

showLoading();
fetchProducts();
updateCartCount();

if (filterContainer) {
    filterContainer.addEventListener('change', filterProducts);
}


