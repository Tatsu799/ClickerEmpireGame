'use strict';

const config = {
  initialPage: document.getElementById('initialPage'),
  mainPage: document.getElementById('mainPage'),
  interval: null,
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

class UserData {
  constructor(name, age, days, money, burgers, items = null) {
    this.name = name;
    this.age = age;
    this.days = days;
    this.money = money;
    this.burgers = burgers;
    if (items !== null) {
      this.items = items;
    } else {
      this.items = this.initializeItems();
    }
  }

  countDays() {
    this.days++;
    if (this.days % 365 === 0) {
      this.age++;
    }
  }

  initializeItems() {
    const initialItems = {
      'Flip machine': new Item('Flip machine', 500, '15,000', './image/flip-machine-img.png'),
      'ETF Stock': new Item('ETF Stock', 0, '300,000', './image/stoks-img.png'),
      'ETF Bonds': new Item('ETF Bonds', 0, '300,000', './image/stoks-img.png'),
      'Lemonade Stand': new Item('Lemonade Stand', 1000, '30,000', './image/lemonade-img.png'),
      'Ice Cream Truck': new Item('Ice Cream Truck', 500, '100,000', './image/ice-cream-img.png'),
      House: new Item('House', 100, '20,000,000', './image/house-img.png'),
      'Town House': new Item('TownHouse', 100, '40,000,000', './image/town-house.png'),
      Mansion: new Item('Mansion', 20, '250,000,000', './image/mansion-img.png'),
      'Industrial Space': new Item('Industrial Space', 10, '1,000,000,000', './image/industrial-space-img.png'),
      'Hotel Skyscraper': new Item('Hotel Skyscraper', 5, '10,000,000,000', './image/hotel-skyscraper-img.png'),
      'Bullet-Speed Sky Railway': new Item('Bullet-Speed Sky Railway', 1, '10,000,000,000,000', './image/bullet-speed-sky -railway-img.png'),
    };

    return initialItems;
  }
}

class Views {
  static startGamePage() {
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
      let userData = new UserData(container.querySelector('input[name="yourName"]').value, 20, 0, 50000, 0);
      if (userData.name === '') {
        alert('Please put your name');
      } else {
        displayBlock(config.mainPage);
        displayNone(config.initialPage);
        Views.mainPage(userData);
        Control.timeInterval(userData);
      }
    });
  }

  static mainPage(userData) {
    const container = document.createElement('div');
    container.classList.add('mainPage-container');

    container.innerHTML = `
      <div class="box-left">
        <div class="count-burgers">
          <p id="burgers" class="burgers">${userData.burgers} Burgers</p>
          <p class="burger-price">one click $25</p>
        </div>
        <div class="image">
          <img id="burgers-image" src="./image/burger-img.png" alt="" />
        </div>
      </div>
      <div id="boxRight" class="box-right">
        <div class="box-info">
          <p class="name">${userData.name}</p>
          <p id="age" class="age">${userData.age}</p>
          <p id="days" class="days">${userData.days.toString()}</p>
          <p id="money" class="money">¥${userData.money}</p>
        </div>
        <div id="boxPurchase" class="box-purchase">
          <div id="purchase-item" class="purchase-item">
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

    const boxRight = container.querySelector('#purchase-item');
    boxRight.addEventListener('click', function () {
      displayNone(boxRight);
      Views.infoPage(userData);
    });

    const burgersImage = container.querySelector('#burgers-image');
    burgersImage.addEventListener('click', function () {
      userData.burgers++;
      Control.rewriteUserData(userData);
    });
  }

  static infoPage(userData) {
    const boxPurchase = document.querySelector('.box-purchase');
    boxPurchase.classList.remove('box-purchase');
    boxPurchase.classList.add('box-purchase-info');

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

    const boxRight = container.querySelector('#purchase-item');
    const goBackButton = boxPurchase.querySelector('.go-back');
    goBackButton.addEventListener('click', function () {
      boxPurchase.classList.remove('box-purchase-info');
      boxPurchase.classList.add('box-purchase');
      boxPurchase.innerHTML = '';
      Views.mainPage(userData);
      // displayBlock(boxRight);
    });
  }
}

class Control {
  static rewriteUserData(userData) {
    let age = config.mainPage.querySelector('#age');
    let days = config.mainPage.querySelector('#days');
    let burgers = config.mainPage.querySelector('#burgers');

    age.innerHTML = `${userData.age}`;
    days.innerHTML = `${userData.days}`;
    burgers.innerHTML = `${userData.burgers} Burgers`;
  }

  static timeInterval(userData) {
    setInterval(function () {
      userData.countDays();

      Control.rewriteUserData(userData);
    }, 1000);
  }
}

Views.startGamePage();
