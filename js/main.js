'use strict';

const config = {
  initialPage: document.getElementById('initialPage'),
  mainPage: document.getElementById('mainPage'),
};

function displayNone(ele) {
  ele.classList.add('displayNone');
}

function displayBlock(ele) {
  ele.classList.remove('displayNone');
}

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
  constructor(name, age, days, money, burgers, items) {
    this.name = name;
    this.age = age;
    this.days = days;
    this.money = money;
    this.burgers = burgers;
    this.items = items;
  }
}

// function countDate(days) {
//   setInterval(function () {
//     days++;
//     // console.log(days);
//   }, 1000);
// }

function startGamePage() {
  const container = document.createElement('div');
  container.classList.add('initial-container');

  container.innerHTML = `
  <h2 class="initial-title">Clicker Empire Game</h2>
  <input id="yourName" class="your-name" name="yourName" type="text" placeholder="Your name" value="aaa"/>
  <div class="buttons">
    <button class="new-button" id="new-button">New</button>
    <button class="login-button" id="login-button">Login</button>
  </div>
  `;

  config.initialPage.append(container);

  displayNone(config.mainPage);
  let newButton = document.getElementById('new-button');
  newButton.addEventListener('click', function () {
    let userData = new UserData(container.querySelector('input[name="yourName"]').value, 20, 0, 50000, 0, []);
    if (userData.name === '') {
      alert('Please put your name');
    } else {
      mainPage(userData);
      displayBlock(config.mainPage);
      displayNone(config.initialPage);
    }
  });

  return config.initialPage;
}

function mainPage(userData) {
  const container = document.createElement('div');
  container.classList.add('mainPage-container');
  console.log(countDate(userData.days));

  container.innerHTML = `
    <div class="box-left">
      <div class="count-burgers">
        <p class="burgers">1 Burgers</p>
        <p class="burger-price">one click $25</p>
      </div>
      <div class="image">
        <img src="./image/burger-img.png" alt="" />
      </div>
    </div>
    <div id="boxRight" class="box-right">
      <div class="box-info">
        <p class="name">${userData.name}</p>
        <p class="age">your age</p>
        <p class="days">${userData.days}</p>
        <p class="money">$50000</p>
      </div>
      <div id="boxPurchase" class="box-purchase">
        <div class="purchase-img">
          <img src="./image/burger-img.png" alt="" />
        </div>
        <div class="purchase-info">
          <div class="items-info">
            <p class="item-name">Flip machine</p>
            <p class="item-price">$15000</p>
          </div>
          <div class="item-count">
            <p class="Possession">0</p>
            <p class="get-money">$25 / click</p>
          </div>
        </div>
      </div>
      <div class="reset-save-button">
        <div class="reset-button">
          <img src="./image/reset-icon.png" alt="" />
        </div>
        <div class="save-button">
          <img src="./image/save-icon.png" alt="" />
        </div>
      </div>
    </div>
  `;

  config.mainPage.append(container);

  const boxRight = container.querySelector('#boxPurchase');
  boxRight.addEventListener('click', function () {
    infoPage();
  });

  return config.mainPage;
}

function infoPage() {
  const boxPurchase = document.querySelector('.box-purchase');
  boxPurchase.classList.remove('box-purchase');
  boxPurchase.classList.add('box-purchase-info');
  // boxPurchase.innerHTML = '';

  boxPurchase.innerHTML = `
  <div class="box-purchase-info">
    <div class="box-purchase-info-wrapper">
      <div class="purchase-img">
        <img src="./image/burger-img.png" alt="" />
      </div>
      <div class="purchase-info">
        <div class="items-info">
          <p class="item-name">Flip machine</p>
          <p class="max-purchases">Max purchases: 500</p>
          <p class="item-price">$15000</p>
          <p class="get-per-money">Get ￥25 /click</p>
        </div>
      </div>
    </div>
    <div class="select-quantity" id="select-quantity">
      <p class="text">How many would you like to buy?</p>
      <input class="input-quantity" type="number" placeholder="1" />
      <p class="total-price">total: $0</p>
    </div>
    <div class="back-next-buttons">
      <button class="go-back">Go Back</button>
      <button class="next">Purchase</button>
    </div>
  </div>
  `;

  const goBackButton = boxPurchase.querySelector('.go-back');
  goBackButton.addEventListener('click', function () {
    boxPurchase.classList.remove('box-purchase-info');
    boxPurchase.classList.add('box-purchase');
    mainPage();
  });
}

startGamePage();
