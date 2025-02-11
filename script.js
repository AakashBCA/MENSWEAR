 // Wait for the document to be fully loaded
 window.onload = function() {
    // Hide the preloader when it compleatly loaded
    document.getElementById('box').style.display = 'none';
     };

     
//hearo section
const slider1 = document.querySelector("#glide1");
if(slider1){
    new Glide(slider1,{
        type:'carousel',
        startAt:0,
        autoplay:3000,
        gap:0,
        hoverpause:true,
        preView:1,
        animationDuration:800,
        AnimationTimingFunc: "linear",
    }).mount()
}

//hamburger menu

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if(bar){
    bar.addEventListener('click',() => {
        nav.classList.add('active')
    })
}

if(close){
    close.addEventListener('click',() => {
        nav.classList.remove('active')
    })
}


//search

let search = document.querySelector("#lens1");
let clear = document.querySelector(".clear");
let searchthing = document.getElementById('lens');

searchthing.onclick = function() {
    document.querySelector("#search").classList.toggle('active');
};

search.onclick = function() {
    document.querySelector("#search").classList.toggle('active');
};

clear.onclick = function() {
    document.getElementById("txt").value = "";
    performSearch(); // Clear search results when input is cleared
};

// // Perform search 

const performSearch = () => {
    const searchbox = document.getElementById("txt").value.toUpperCase();
    const product = document.querySelectorAll(".product-box");
    const pname = document.getElementsByTagName("h2");
    
    // Get all <h2>, <p>, <footer>, #newsletter and #pagination elements 
    const headers = document.querySelectorAll("h1, p");
    const footer = document.querySelector("footer");
    const subscribe = document.querySelector("#newsletter");
    const page = document.querySelector("#pagination");

    // If there's a search term, hide the <h2>, <p>, #newsletter, #pagination and <footer> elements
    if (searchbox !== "") {
        headers.forEach(header => {
            header.style.display = "none";
        });
        if (footer) footer.style.display = "none";
        if (subscribe) subscribe.style.display = "none";
        if (page) page.style.display = "none";

    } else {
        // If no search term, show the <h2>, <p>, and <footer> elements again
        headers.forEach(header => {
            header.style.display = "";
        });
        if (footer) footer.style.display = "";
        if (subscribe) subscribe.style.display = "";
        if (page) subscribe.style.display = "";
    }

    let foundProducts = false; 

    for (let i = 0; i < product.length; i++) {
        let match = product[i].getElementsByTagName('h2')[0];

        if (match) {
            let textvalue = match.textContent || match.innerHTML;

            // If the search term matches the product name
            if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
                product[i].style.display = ""; // Show product
                foundProducts = true; // Mark product
            } else {
                // Otherwise, hide 
                product[i].style.display = "none";
            }
        }
    }
};

// Perform search by user type
document.getElementById("txt").addEventListener("input", performSearch);



//cart


const cartIcon = document.querySelector("#lgbag");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartIcon2 = document.querySelector("#mgbag");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartIcon2.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
const cartContent = document.querySelector(".cart-content");

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});


const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price-and-cart span").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart.");
            return; 
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="far fa-times-circle cart-remove"></i>
    `;

    // Add event listeners for the newly created buttons
    const incrementButton = cartBox.querySelector(".increment");
    const decrementButton = cartBox.querySelector(".decrement");
    const quantityDisplay = cartBox.querySelector(".number");
    const removeButton = cartBox.querySelector(".cart-remove");

    incrementButton.addEventListener("click", () => {
        let quantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = quantity + 1;
        updateTotalPrice();
    });

    decrementButton.addEventListener("click", () => {
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
            quantityDisplay.textContent = quantity - 1;
        }
        updateTotalPrice();
    });

    // Add event listener for remove button
    removeButton.addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice(); // Update total price after removal
        updateCartCount(-1); // Update cart count after removal
    });

    // Add the cart box to the cart content
    cartContent.appendChild(cartBox);

    // Update total price and cart item count after adding to cart
    updateTotalPrice();
    updateCartCount(1); // Increase cart count when an item is added
};

// Function to sum up total prices from all items in the cart
const updateTotalPrice = () => {
    const totalPriceDisplay = document.querySelector(".total-price");
    let total = 0;
    const cartBoxes = cartContent.querySelectorAll(".cart-box");

    cartBoxes.forEach(box => {
        const priceText = box.querySelector(".cart-price").textContent;
        const quantity = parseInt(box.querySelector(".number").textContent);
        const price = parseFloat(priceText.replace(/Rs./g, '').trim()); // Convert price string to float
        total += price * quantity;
    });

    totalPriceDisplay.textContent = `Rs.${total.toFixed(2)}`; // Format total price
};

// notification

let cartItemCount = 0;
let cartItemCount1 = 0;

function updateCartCount(change) {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    const cartItemCountBadge1 = document.querySelector(".cart-item-count1");
    if (!cartItemCountBadge || !cartItemCountBadge1) {
        console.error("Cart badge elements not found.");
        return;
    }
    cartItemCount += change;
    cartItemCount1 += change;
    if (cartItemCount > 0 || cartItemCount1 > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
        cartItemCountBadge1.style.visibility = "visible";
        cartItemCountBadge1.textContent = cartItemCount1;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
        cartItemCountBadge1.style.visibility = "hidden";
        cartItemCountBadge1.textContent = "";
    }
}

// Remove the lgbag in hamburgermenu
document.querySelector("#bar").addEventListener("click", function() {
    const homeLink = document.querySelector("#lgbag");
    if (homeLink) {
        homeLink.remove();
    }
});
document.querySelector("#bar").addEventListener("click", function() {
    const searchLink = document.querySelector("#lens1");
    if (searchLink) {
        searchLink.remove();
    }
});



function sendToWhatsApp() {
    let phone = "+91123456789"; 
    let productName = "POLO TSHIRT"; 
    let price = "100"; 
    let imageUrl = "https://aakashbca.github.io/menswear/img/shirt-1.jpg"; 
    let message = encodeURIComponent(`Check out this product:${productName}\nPrice: $${price}\nimage:${imageUrl}`);
    let url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
}

//cart msg


const addCartBtns = document.querySelectorAll('.add-cart');
const cartmsg = document.querySelector('.cart-msg');
addCartBtns.forEach(function(btn) {
btn.addEventListener('click', function(event) {
    const productBox = event.target.closest('.product-box');
    const productName = productBox.querySelector('.product-title').innerText;
    const productPrice = productBox.querySelector('.price-and-cart span').innerText;
    const productImage = productBox.querySelector('img').src;
    cartmsg.classList.add('active');
    setTimeout(function() {
        cartmsg.classList.remove('active');
    }, 2000);
    console.log(`Product: ${productName}, Price: ${productPrice}, Image: ${productImage}`);
});
});

