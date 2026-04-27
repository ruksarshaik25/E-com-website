let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [
  { name: "Phone", price: 10000 },
  { name: "Laptop", price: 50000 },
  { name: "Headphones", price: 2000 },
  { name: "Tablet", price: 15000 },
    { name: "Smart Watch", price: 3000 },
  { name: "Gaming Mouse", price: 1200 },
  { name: "Bluetooth Speaker", price: 2500 },
   { name: "Smart TV", price: 40000 },
  { name: "LED Monitor", price: 12000 },
  { name: "WiFi Router", price: 2000 }
];


// 🔐 LOGIN
function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  let userValid = /^[a-zA-Z0-9]+$/.test(user);
  let passValid = pass.length >= 7;

  if (!userValid) {
    document.getElementById("error").innerText =
      "Username only letters & numbers allowed!";
    return;
  }

  if (!passValid) {
    document.getElementById("error").innerText =
      "Password must be at least 7 characters!";
    return;
  }

  document.getElementById("login").style.display = "none";
  document.getElementById("home").classList.remove("hidden");
}


// 🏠 ENTER SHOP
function enterShop() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("shop").classList.remove("hidden");
}


// 🛍️ RENDER PRODUCTS
function renderProducts(list) {
  let container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p => {
    let div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add</button>
    `;

    container.appendChild(div);
  });
}

renderProducts(products);


// 🔍 SEARCH
function searchProducts() {
  let value = document.getElementById("search").value.toLowerCase();

  let result = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  renderProducts(result);
}


// 🎯 FILTER
function filterProducts() {
  let value = document.getElementById("filter").value;

  let result = products;

  if (value === "low") {
    result = products.filter(p => p.price < 10000);
  } else if (value === "high") {
    result = products.filter(p => p.price >= 10000);
  }

  renderProducts(result);
}


// 🛒 CART
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;

  let list = document.getElementById("cart-items");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item, i) => {
    total += item.price;

    let li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price}
      <button onclick="removeItem(${i})">X</button>`;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
}

function toggleCart() {
  let cartBox = document.getElementById("cart");
  cartBox.style.display =
    cartBox.style.display === "block" ? "none" : "block";
}

updateCart();