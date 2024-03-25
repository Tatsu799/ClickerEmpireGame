'use strict';

const config = {
  initialPage: document.getElementById('initialPage'),
  mainPage: document.getElementById('mainPage'),
};

class Item {
  constructor(name, maxQuantity, price, imgUrl) {
    this.name = name;
    this.maxQuantity = maxQuantity;
    this.price = price;
    this.imgUrl = imgUrl;
  }
}

const items = [
  new Item('Flip machine', 500, '15,000', './image/flip-machine-img.png'),
  new Item('ETF Stock', 0, '300,000', './image/stoks-img.png'),
  new Item('ETF Bonds', 0, '300,000', './image/stoks-img.png'),
  new Item('Lemonade Stand', 1000, '30,000', './image/lemonade-img.png'),
  new Item('Ice Cream Truck', 500, '100,000', './image/ice-cream-img.png'),
  new Item('House', 100, '20,000,000', './image/house-img.png'),
  new Item('TownHouse', 100, '40,000,000', './image/town-house.png'),
  new Item('Mansion', 20, '250,000,000', './image/mansion-img.png'),
  new Item('Industrial Space', 10, '1,000,000,000', './image/industrial-space-img.png'),
  new Item('Hotel Skyscraper', 5, '10,000,000,000', './image/hotel-skyscraper-img.png'),
  new Item('Bullet-Speed Sky Railway', 1, '10,000,000,000,000', './image/bullet-speed-sky -railway-img.png'),
];

class UserData {
  constructor(name, age, date, money, burgers, items) {
    this.name = name;
    this.age = age;
    this.date = date;
    this.money = money;
    this.burgers = burgers;
    this.items = items;
  }
}

function startGamePage() {
  const container = document.createElement('div');
  container.classList.add('initial-container');

  container.innerHTML = `
  <h2 class="initial-title">Clicker Empire Game</h2>
  <input id="yourName" class="your-name" name="yourName" type="text" placeholder="Your name" />
  <div class="buttons">
    <button class="new-button" id="new-button">New</button>
    <button class="login-button" id="login-button">Login</button>
  </div>
  `;

  config.initialPage.append(container);

  let newButton = document.getElementById('new-button');
  newButton.addEventListener('click', function () {
    let userData = new UserData(container.querySelector('input[name="yourName"]').value, 20, 1, 50000, 0, []);
    if (userData.name === '') {
      alert('Please put your name');
    }
  });

  return config.initialPage;
}

function mainPage() {}

startGamePage();
