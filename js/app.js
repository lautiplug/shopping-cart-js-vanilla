const productsEl = document.querySelector(".products");
const CartItemsElements = document.querySelector("#cart-items tbody");
const subtotalElements = document.querySelector(".buttonCheckout");
const totalItemsInCartCount = document.querySelector("#contador-productos");


let cart = JSON.parse(localStorage.getItem("CART")) || [];
let products = [];

async function loadProducts() {
  try {
    const response = await fetch("js/products.json");
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
  updateCart()
}

function renderProducts(products) {
  products.forEach((product) => {
    productsEl.innerHTML += `
        <div class="card-products">
            <img src="${product.imgSrc}" class="imagen-producto">
                <div class="info-card">
                <h4 class="card-title">${product.name}</h4>
                <p class="precio">$${product.price}</p>
                <img src="img/carrito.png" alt="añadir al carrito" class="add-cart" onclick="addToCart(${product.id})">
                </div>
        </div>
        `;
  });
}

loadProducts();

function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfItems: 1,
    });
  }

  const Toast = Swal.mixin({
    background: "#1b1b1b",
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
  });

  Toast.fire({
    width: "310px",
    color: "#fff",
    title: "Product added successfully",
  });

  updateCart();
}

// Actualizar carrito

function updateCart() {
  renderCartItems();
  renderSubTotal();

  // LocalStorage con key y value
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calcular y mostrar el subtotal

function renderSubTotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice = totalPrice + item.price * item.numberOfItems;
    totalItems = totalItems + item.numberOfItems;
  });

  subtotalElements.innerHTML = `
      <a href="confirmBuy.html" id="checkout" class="cart-empty">Subtotal (${totalItems} items): $${totalPrice.toFixed(2)} | Checkout</a>
    `;

  if (!cart.length) {
    subtotalElements.innerHTML = `
    <a href="confirmBuy.html" id="checkout" class="cart-empty">Your cart is empty!</a>
      `;
  }

  totalItemsInCartCount.innerText = totalItems;
  console.log(totalPrice);
}

// mostrar los items en el carrito
function renderCartItems() {
  CartItemsElements.innerHTML = ""; // limpiar HTML
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <img class="item-img-src ss" src="${item.imgSrc}">
            <div class="container-carrito-items">
                <div class="carrito-titulo">${item.name}</div>
                <div class="carrito-titulo">Color: ${item.color}</div>
                <div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})"> - </div>
                     <div class="number">${item.numberOfItems}</div>
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})"> + </div>
                </div>
                <div class="carrito-precio">$${item.price}</div>
            </div>
        <div>
        <p class="delete-item" onclick="removeItemFromCart(${item.id})">Delete</p>
        </div>
        `;
    CartItemsElements.appendChild(row);
  });
}

//  Eliminar item del carrito
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
// cambiar el numero de items para un item

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfItems = item.numberOfItems;

    if (item.id === id) {
      if (action === "minus" && numberOfItems > 1) {
        numberOfItems--;
      } else if (action === "plus" && numberOfItems < item.instock) {
        numberOfItems++;
      }
      // numberOfItems no puede ser < a 1 producto
      // numberOfItems no puede ser > a item.instock
    }
    return {
      ...item,
      numberOfItems,
    };
  });
  updateCart();
}


///////////////////////////////////////////////// METODO PARA BUSCAR MEDIANTE UN INPUT //////////////////////////////////////////////////

// Obtén el botón de búsqueda y el campo de entrada de texto
const searchButton = document.querySelector("#searchButton");
const filterInput = document.querySelector("#filterInput");
const showAllButton = document.querySelector("#showAllButton");

searchButton.addEventListener("click", searchProducts);
showAllButton.addEventListener("click", showAllProducts);

function searchProducts() {
  const filterValue = filterInput.value.toLowerCase();
  localStorage.setItem("searchValue", filterValue);
  filterProducts();
}

function showAllProducts() {
  localStorage.removeItem("searchValue");
  filterInput.value = "";
  filterProducts();
}

function filterProducts() {
  const savedSearchValue = localStorage.getItem("searchValue");
  const filterValue = savedSearchValue ? savedSearchValue.trim() : "";

  if (filterValue !== "") {
    const filteredProducts = products.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(filterValue);
    });

    renderProducts(filteredProducts);
  } else {
    renderProducts(products);
  }
}

window.addEventListener("load", function() {
  const savedSearchValue = localStorage.getItem("searchValue");

  if (savedSearchValue) {
    filterInput.value = savedSearchValue;
    filterProducts();
  } else {
    renderProducts(products);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
