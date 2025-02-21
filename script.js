import { products } from "./products.js";

const productsContainer = document.querySelector(".products-container");



function showProducts(products) {
    products.forEach((product) => {
        productsContainer.innerHTML += `
    <div class="products-container">
         <div class="product-card">
                <div class="product-img">
                    <img src="${product.image.url}" alt="${product.alt}">
                </div>
                <div class="product-details">
                    <h2>${product.title}</h2>
                    <h2><small>$</small>${product.price}</h2>
                </div>
                <div class="add-to-cart" data-id="${product.id}">Add to cart</div>
                <a href="./product-details.html?id=${product.id}">VIEW DETAILS </a>
            </div>
        </div>`;
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          addToCart(productId);
        });
      });
}

showProducts(products);



let cart = [];

function addToCart(id) {
    let item;

    if (cart.some((item) => item.id === id)) {
        alert("This product is already in the cart!");
    } else {
        item = products.find((product) => product.id === id); 
    }
    if (item) {
        cart.push(item);
        console.log(cart); 
    }
}