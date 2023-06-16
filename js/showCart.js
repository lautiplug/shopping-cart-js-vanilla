// Funciones para expandir el carrito
const menuWhite = document.querySelector('.header__container-white')
document.querySelector("#btn").addEventListener("click", show_cart);
document.querySelector(".close-cart").addEventListener("click", hide_cart);

const showCart = document.querySelector(".cart__table");
const backgroundCart = document.querySelector(".container-phone-menu");

function show_cart(){
    showCart.style.right = "0px";
    backgroundCart.style.display = "block";
    menuWhite.style.background = "rgba(0, 0, 1, 0)"
}

function hide_cart(){
    showCart.style.right = "-100%";
    backgroundCart.style.display = "none";
}
