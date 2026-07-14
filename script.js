/* =====================================================
   DRONE FLOWER DELIVERY - script.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Drone Flower Delivery Website Loaded!");

    /* ==========================================
       LOGIN PAGE
    ========================================== */

    const loginForm = document.querySelector(".login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value.trim();

            if (email === "" || password === "") {

                alert("Please enter Email and Password.");

                return;

            }

            alert("Login Successful!");

            // Redirect
            window.location.href = "flowershop.html";

        });

    }

    /* ==========================================
       REGISTER PAGE
    ========================================== */

    const registerForm = document.querySelector(".register-form");

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs = registerForm.querySelectorAll("input");

            let valid = true;

            inputs.forEach(input => {

                if (input.type !== "checkbox" && input.value.trim() === "") {

                    valid = false;

                }

            });

            const password = registerForm.querySelectorAll('input[type="password"]')[0].value;

            const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;

            if (!valid) {

                alert("Please fill all fields.");

                return;

            }

            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;

            }

            alert("Account Created Successfully!");

            window.location.href = "login.html";

        });

    }

    /* ==========================================
       LANDING PAGE BUTTON
    ========================================== */

    const bookButton = document.querySelector(".primary-btn");

    if (bookButton) {

        bookButton.addEventListener("click", function (e) {

            e.preventDefault();
            window.location.href = "flowershop.html";

        });

    }

    const STORAGE_KEY = "selectedFlowers";

    function getSelectedItems() {

        try {

            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        } catch (error) {

            return [];

        }

    }

    function saveSelectedItems(items) {

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    }

    function updateCartSummary() {

        const selectedItems = getSelectedItems();

        const itemCount = document.getElementById("itemCount");

        const totalPrice = document.getElementById("totalPrice");

        if (itemCount) {

            itemCount.innerText = selectedItems.length;

        }

        if (totalPrice) {

            const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

            totalPrice.innerText = "₹" + subtotal;

        }

    }

    /* ==========================================
       SEARCH FLOWERS
    ========================================== */

    const searchBox = document.querySelector('input[placeholder*="Search"]');

    if (searchBox) {

        searchBox.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            const cards = document.querySelectorAll(".product-card");

            cards.forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

 
    /* ==========================================
       ADD TO CART
    ========================================== */

    const addButtons = document.querySelectorAll(".product-card button");

    addButtons.forEach(button => {

        button.addEventListener("click", function () {

            const card = this.parentElement;

            const name = card.querySelector("h3").innerText.trim();

            const price = parseInt(
                card.querySelector("h4").innerText.replace("₹", ""),
                10
            );

            const selectedItems = getSelectedItems();

            selectedItems.push({ name, price });

            saveSelectedItems(selectedItems);

            updateCartSummary();

            alert(`${name} added to cart!`);

        });

    });

    updateCartSummary();

    /* ==========================================
       CHECKOUT BUTTON
    ========================================== */

    const checkoutBtn = document.getElementById("checkoutBtn");

    if(checkoutBtn){

        checkoutBtn.addEventListener("click", ()=>{

            const selectedItems = getSelectedItems();

            if(selectedItems.length === 0){

                alert("Please select at least one flower.");

                return;

            }

            window.location.href = "payment.html";

        });

    }
    /* ==========================================
       PAYMENT PAGE
    ========================================== */

    const paymentForm = document.querySelector(".payment-form form");

    const orderItems = document.querySelector(".order-summary .order-items");

    const totalAmount = document.getElementById("totalAmount");

    const deliveryCharge = document.getElementById("deliveryCharge");

    const gstAmount = document.getElementById("gstAmount");

    const payButton = document.querySelector(".pay-btn");

    if (orderItems || totalAmount || payButton) {

        const selectedItems = getSelectedItems();

        const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

        const delivery = selectedItems.length > 0 ? 50 : 0;

        const gst = selectedItems.length > 0 ? 45 : 0;

        const total = subtotal + delivery + gst;

        if (orderItems) {

            if (selectedItems.length === 0) {

                orderItems.innerHTML = '<div class="item"><span>No bouquet selected</span><span>₹0</span></div>';

            } else {

                orderItems.innerHTML = selectedItems.map(item => `
                    <div class="item">
                        <span>${item.name}</span>
                        <span>₹${item.price}</span>
                    </div>
                `).join("");

            }

        }

        if (deliveryCharge) {

            deliveryCharge.innerText = "₹" + delivery;

        }

        if (gstAmount) {

            gstAmount.innerText = "₹" + gst;

        }

        if (totalAmount) {

            totalAmount.innerText = "₹" + total;

        }

        if (payButton) {

            payButton.innerHTML = `💳 Pay ₹${total}`;

        }

    }

    if (paymentForm) {

    paymentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const selectedItems = getSelectedItems();

        const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

        const delivery = selectedItems.length > 0 ? 50 : 0;

        const gst = selectedItems.length > 0 ? 45 : 0;

        const total = subtotal + delivery + gst;

        // Customer Name
        const customer = document.getElementById("customerName").value;

        // Save complete order
        const order = {

            orderId: "DFD" + Date.now(),

            customer: customer,

            flowers: selectedItems,

            quantity: selectedItems.length,

            total: total

        };

        localStorage.setItem("orderDetails", JSON.stringify(order));

        alert("Payment Successful!");

        localStorage.removeItem(STORAGE_KEY);

        window.location.href = "order.html";

    });

}
    /* ==========================================
       CANCEL ORDER
    ========================================== */

    const cancelButton = document.querySelector(".cancel-btn");

    if (cancelButton) {

        cancelButton.addEventListener("click", function () {

            const result = confirm("Cancel this order?");

            if (result) {

                localStorage.removeItem(STORAGE_KEY);

                window.location.href = "flowershop.html";

            }

        });

    }

    /* ==========================================
   ORDER PAGE
========================================== */

const order = JSON.parse(localStorage.getItem("orderDetails"));

if (order) {

    document.getElementById("orderId").textContent = "#" + order.orderId;

    document.getElementById("customerName").textContent = order.customer;

    document.getElementById("flowerName").textContent =
        order.flowers.map(item => item.name).join(", ");

    document.getElementById("quantity").textContent = order.quantity;

    document.getElementById("amount").textContent = order.total;

}
    /* ==========================================
       BUTTON HOVER EFFECT
    ========================================== */

    const allButtons = document.querySelectorAll("button");

    allButtons.forEach(btn => {

        btn.addEventListener("mouseenter", function () {

            this.style.transform = "scale(1.05)";

            this.style.transition = "0.3s";

        });

        btn.addEventListener("mouseleave", function () {

            this.style.transform = "scale(1)";

        });

    });

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

});