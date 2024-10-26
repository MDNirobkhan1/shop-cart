let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Chicken",
    image: "food_2.png",
    details:
      "Food, substance consisting of protein, carbohydrate, fat, and other nutrients used in the body of an organism to sustain growth",
    price: 200
  },
  {
    id: 2,
    name: "Chicken Fry",
    image: "food_3.png",
    details:
      "Food, substance consisting of protein, carbohydrate, fat, and other nutrients used in the body of an organism to sustain growth",
    price: 400
  },
  {
    id: 3,
    name: "Pasta Men",
    image: "food_4.png",
    details:
      "Food, substance consisting of protein, carbohydrate, fat, and other nutrients used in the body of an organism to sustain growth",
    price: 300
  }
];

let listCards = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
        <img src="image/${value.image}"  />
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}$</div>
        <div class="details">${value.details}</div>
        <button onclick="addToCard(${key})" data-id="${key}" class="add-to-cart">Add To Cart</button>
        <button class="customize">Customize</button>
        `;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCard(key) {
  if (!listCards[key] || listCards[key].quantity === 0) {
    listCards[key] = { ...products[key], quantity: 1 };

    const button = document.querySelector(`button[data-id="${key}"]`);
    if (button) {
      button.style.backgroundColor = "gray";
      button.style.color = "white";
    }
    reloadCard();
  }
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    if (value && value.quantity > 0) {
      totalPrice += value.price * value.quantity;
      count += value.quantity;

      const newDiv = document.createElement("li");
      newDiv.innerHTML = `
          <div><img src="image/${value.image}" alt="${value.name}" /></div>
          <div>${value.name}</div>
          <div>${(value.price * value.quantity).toLocaleString()}</div>
          <div>
            <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
            <button onclick="deleteItem(${key})">Delete</button>
          </div>
        `;
      listCard.appendChild(newDiv);
    }
  });

  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, newQuantity) {
  if (newQuantity < 0) return;
  if (newQuantity === 0) {
    deleteItem(key);
  } else {
    listCards[key].quantity = newQuantity;
    reloadCard();
  }
}

function deleteItem(key) {
  if (listCards[key]) {
    listCards[key].quantity = 0;

    const button = document.querySelector(`button[data-id="${key}"]`);
    if (button) {
      button.style.backgroundColor = "";
      button.style.color = "";
      button.innerText = "Add To Cart";
    }
  }
  reloadCard(); // Reload the card display
}
