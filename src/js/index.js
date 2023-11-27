// Получил ссылки на соответствующие элементы HTML.
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
const cartItemsContainer = document.getElementById("cart-items");

// Получил корзину из localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Добавил прослушиватель кликов для каждой кнопки «Добавить в корзину».
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
// Получил информацию о продукте
    const card = button.closest(".card");
    const name = card.querySelector(".card-name").innerText;
    const price = card.querySelector(".price").innerText;

    // Добавил товар в корзину
    const productInfo = { name, price };
    cart.push(productInfo);
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

// Отображение содержимого корзины при загрузке страницы
cart.forEach(item => {
  const cartItem = document.createElement("div");
  const image = item.image ? `<img class="product-img" src="${item.image}" alt="${item.name}">` : "";
  
  cartItem.innerHTML = `
    <div>Name: ${item.name}</div>
    <div>Price: ${item.price}</div>
    ${image}
  `;

  cartItemsContainer.appendChild(cartItem);
});
