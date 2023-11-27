// Получил ссылки на соответствующие элементы HTML.
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
const cartItemsContainer = document.getElementById("cart-items");

// Получил корзину из localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Добавил прослушиватель кликов для каждой кнопки «Добавить в корзину».
addToCartButtons.forEach((button) => {
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
cart.forEach((item) => {
  const cartItem = document.createElement("div");
  const image = item.image
    ? `<img class="product-img" src="${item.image}" alt="${item.name}">`
    : "";

  cartItem.innerHTML = `
    <div>Name: ${item.name}</div>
    <div>Price: ${item.price}</div>
    ${image}
  `;

  cartItemsContainer.appendChild(cartItem);
});

// Заново получить корзину из localStorage

// Функция для обновления корзины в localStorage
const updateCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Отображение содержимого корзины по загрузке страницы
const displayCartItems = () => {
  cartItemsContainer.innerHTML = ""; // Очистить контейнер перед отображением элементов

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    const image = item.image
      ? `<img class="product-img" src="${item.image}" alt="${item.name}">`
      : "";

    cartItem.innerHTML = `
      <div>Name: ${item.name}</div>
      <div>Price: ${item.price}</div>
      ${image}
      <div>
        <button class="remove-item-button" data-index="${index}">Удалить</button>
        <button class="increase-quantity-button" data-index="${index}">Увеличить</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Добавить прослушиватель событий для кнопок удаления товара и увеличения количества
  const removeItemButtons = document.querySelectorAll(".remove-item-button");
  removeItemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      cart.splice(index, 1); // Удалить элемент из корзины
      updateCart(cart); // Обновить корзину в localStorage
      displayCartItems(); // Перерисовать корзину
    });
  });

  const increaseQuantityButtons = document.querySelectorAll(
    ".increase-quantity-button"
  );
  increaseQuantityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      cart[index].quantity = (cart[index].quantity || 1) + 1; // Увеличить количество товара
      updateCart(cart); // Обновить корзину в localStorage
      displayCartItems(); // Перерисовать корзину
    });
  });
};

// Отображение содержимого корзины при загрузке страницы
displayCartItems();
