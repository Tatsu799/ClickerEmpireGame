'use strict';

const config = {
  initialPage: document.getElementById('initialPage'),
  mainPage: document.getElementById('mainPage'),
};

function displayNone(ele) {
  ele.classList.remove('displayBlock');
  ele.classList.add('displayNone');
}

function displayBlock(ele) {
  ele.classList.remove('displayNone');
  ele.classList.add('displayBlock');
}

class Item {
  constructor(name, type, maxQuantity, price, imgUrl, unitPrice, perClick, perSec, itemPurchaseCount, totalPrice) {
    this.name = name;
    this.type = type;
    this.maxQuantity = maxQuantity;
    this.price = price;
    this.imgUrl = imgUrl;
    this.unitPrice = unitPrice;
    this.perClick = perClick;
    this.perSec = perSec;
    this.itemPurchaseCount = itemPurchaseCount;
    this.totalPrice = 0;
  }
}

class UserData {
  constructor(name, age, days, money, burgers, items) {
    this.name = name;
    this.age = age;
    this.days = days;
    this.money = money;
    this.burgers = burgers;
    this.items = items;
    this.perClickPrice = 25;
    this.perSecPrice = 0;
    this.totalItemPrice = 0;
  }
}

class Views {
  static startGamePage() {
    const container = document.createElement('div');
    container.classList.add('initial-container');

    container.innerHTML = `
    <h2 class="initial-title">Clicker Empire Game</h2>
    <input id="yourName" class="your-name" name="yourName" type="text" placeholder="Your name"/>
    <div class="buttons">
      <button class="new-button" id="new-button">New</button>
      <button class="login-button" id="login-button">Login</button>
    </div>
    `;

    config.initialPage.append(container);
  }

  static mainPage(userData) {
    const container = document.createElement('div');
    container.classList.add('mainPage-container');

    container.innerHTML = `
      <div id="burgers-info" class="box-left">
      </div>

      <div class="box-right">
        <div id="userInfo" class="user-info-box">
        </div>
        
        <div id="purchaseItems" class="box-container">
        </div>  

        <div id="resetSaveButton">
        </div>  
      </div>
    `;

    config.mainPage.append(container);

    container.querySelector('#burgers-info').append(Views.burgersInfo(userData));
    container.querySelector('#burgers-info').append(Views.burgerImage(userData));
    container.querySelector('#userInfo').append(Views.userInfo(userData));
    container.querySelector('#purchaseItems').append(Views.boxPurchasePage(userData));
    container.querySelector('#resetSaveButton').append(Views.resetSaveButton(userData));
  }

  static burgersInfo(userData) {
    let boxBurger = document.createElement('div');
    boxBurger.classList.add('count-burgers');

    boxBurger.innerHTML = `
      <p id="burgers" class="burgers">${userData.burgers} Burgers</p>
      <p class="burger-price">One click ¥${userData.perClickPrice}</p>
    `;

    return boxBurger;
  }

  static burgerImage(userData) {
    const container = document.createElement('div');
    container.classList.add('image-box');

    container.innerHTML = `
    <div id="burger-count" class="image-wrapper">
    <p>Click me!!!!</p>
      <img id="burgers-image" src="./image/burger-img.png" alt="" />
    </div>  
  `;

    let clickBurger = container.querySelector('#burgers-image');
    clickBurger.addEventListener('click', function () {
      Controller.CountClickBurger(userData);
    });

    return container;
  }

  static userInfo(userData) {
    const boxRight = document.createElement('div');
    boxRight.classList.add('user-info');

    boxRight.innerHTML = `
      <p class="name">${userData.name}</p>
      <p id="age" class="age">${userData.age} years old</p>
      <p id="days" class="days">${userData.days.toString()} days</p>
      <p id="money" class="money">¥${userData.money}</p>
    `;

    return boxRight;
  }

  static boxPurchasePage(userData) {
    const container = document.createElement('div');
    container.classList.add('box-purchase');
    container.setAttribute('id', 'box-purchase');

    for (let i = 0; i < userData.items.length; i++) {
      container.innerHTML += `
      <div id="purchase-item" class="purchase-item" index="${i}">
        <div class="purchase-img">
          <img src="${userData.items[i].imgUrl}" alt="" />
        </div>
        <div class="purchase-info">
          <div class="items-info">
            <p class="item-name">${userData.items[i].name}</p>
            <p class="item-price">¥${userData.items[i].price}</p>
          </div>
          <div class="item-count">
            <p class="Possession">${userData.items[i].itemPurchaseCount}</p>
            <p class="get-money">${userData.items[i].unitPrice}</p>
          </div>
        </div>
      </div>
    `;
    }

    const purchaseItems = container.querySelectorAll('#purchase-item');
    const itemsBox = config.mainPage.querySelector('#purchaseItems');

    for (let i = 0; i < purchaseItems.length; i++) {
      purchaseItems[i].addEventListener('click', function () {
        itemsBox.innerHTML = '';
        itemsBox.append(Views.itemInfoPage(userData, i));
      });
    }

    return container;
  }

  static itemInfoPage(userData, index) {
    const container = document.createElement('div');
    container.classList.add('box-purchase-info');
    container.setAttribute('id', 'box-purchase-info');
    container.setAttribute('index', index);

    container.innerHTML = `
      <div class="box-purchase-info-wrapper">
        <div class="purchase-img">
          <img src="${userData.items[index].imgUrl}" alt="" />
        </div>
        <div class="purchase-info">
          <div class="items-info">
            <p class="item-name">${userData.items[index].name}</p>
            <p class="max-purchases">Max purchases: ${userData.items[index].maxQuantity}</p>
            <p class="item-price">¥ ${userData.items[index].price}</p>
            <p class="get-per-money">Get ${userData.items[index].unitPrice}</p>
          </div>
        </div>
      </div>
      <div class="select-quantity" id="select-quantity">
        <p class="text">How many would you like to buy?</p>
        <input id="inputNum" class="input-quantity" type="number" placeholder="1"/>
        <p id="totalPrice" class="total-price">total: ¥${userData.totalItemPrice}</p>
      </div>
      <div class="back-next-buttons">
        <button id="go-back" class="go-back">Go Back</button>
        <button id="purchase" class="purchase">Purchase</button>
      </div>
    `;

    const purchaseItems = config.mainPage.querySelector('#purchaseItems');
    const goBackButton = container.querySelector('#go-back');
    const inputNum = container.querySelector('#inputNum');

    inputNum.addEventListener('change', function () {
      Controller.totalItemPrice(userData, index, inputNum);
    });

    goBackButton.addEventListener('click', function () {
      purchaseItems.innerHTML = '';
      purchaseItems.append(Views.boxPurchasePage(userData));
    });

    const purchaseButton = container.querySelector('#purchase');
    purchaseButton.addEventListener('click', function () {
      if (inputNum.value < 1) {
        alert('put number');
      } else {
        Controller.purchaseItem(userData, inputNum.value);
        purchaseItems.innerHTML = '';
        userData.totalItemPrice = 0;
        purchaseItems.append(Views.boxPurchasePage(userData));
      }
    });

    return container;
  }

  static resetSaveButton(userData) {
    const resetSaveButton = document.createElement('div');
    resetSaveButton.classList.add('reset-save-button');

    resetSaveButton.innerHTML = `
      <div id="reset" class="reset-button">
        <img src="./image/reset-icon.png" alt="" />
      </div>
      <div id="save" class="save-button">
        <img src="./image/save-icon.png" alt="" />
      </div>
    `;

    const resetButton = resetSaveButton.querySelector('#reset');
    const saveButton = resetSaveButton.querySelector('#save');

    saveButton.addEventListener('click', function () {
      let jsonEncoded = JSON.stringify(userData);
      localStorage.setItem(userData.name, jsonEncoded);
      alert('Save your data!! \n Please put your name when your login again.');

      config.mainPage.innerHTML = '';
      config.initialPage.innerHTML = '';
      displayBlock(config.initialPage);
      Controller.stopTimer();
      Controller.startGame();
    });

    resetButton.addEventListener('click', function () {
      Controller.resetUserData(userData);
    });

    return resetSaveButton;
  }

  static updateBurgersPage(userData) {
    let burgersInfo = config.mainPage.querySelector('#burgers-info');
    burgersInfo.innerHTML = '';
    burgersInfo.append(Views.burgersInfo(userData));
    burgersInfo.append(Views.burgerImage(userData));
  }

  static updateUserInfoPage(userData) {
    let userInfo = config.mainPage.querySelector('#userInfo');
    userInfo.innerHTML = '';
    userInfo.append(Views.userInfo(userData));
  }
}

class Controller {
  setTimer;

  //MainPageへ遷移。
  static startGame() {
    Views.startGamePage();
    displayNone(config.mainPage);

    const newButton = document.getElementById('new-button');
    const loginButton = document.getElementById('login-button');

    newButton.addEventListener('click', function () {
      let userData = Controller.initialUserData();
      if (userData.name === '') {
        alert('Please put your name');
      } else {
        displayBlock(config.mainPage);
        displayNone(config.initialPage);
        Views.mainPage(userData);
        Controller.timeInterval(userData);
      }
    });

    loginButton.addEventListener('click', function () {
      const userName = config.initialPage.querySelector('#yourName').value;
      if (localStorage.getItem(userName) === null) {
        alert('No user data');
      } else {
        let userInfo = JSON.parse(localStorage.getItem(userName));
        displayBlock(config.mainPage);
        displayNone(config.initialPage);
        Views.mainPage(userInfo);
        Controller.timeInterval(userInfo);
      }
    });
  }

  static initialUserData() {
    const Items = [
      new Item('Flip machine', 'click', 500, 15000, './image/flip-machine-img.png', '¥25/click', 25, 0, 0),
      new Item('ETF Stock', 'stock', '∞', 300000, './image/stoks-img.png', '¥0.1/sec', 0, 0.1, 0),
      new Item('ETF Bonds', 'stock', '∞', 300000, './image/stoks-img.png', '¥0.7/sec', 0, 0.07, 0),
      new Item('Lemonade Stand', 'other', 1000, 30000, './image/lemonade-img.png', '¥30/sec', 0, 30, 0),
      new Item('Ice Cream Truck', 'other', 500, 100000, './image/ice-cream-img.png', '¥120/sec', 0, 120, 0),
      new Item('House', 'other', 100, 20000000, './image/house-img.png', '¥32000/sec', 0, 32000, 0),
      new Item('TownHouse', 'other', 100, 40000000, './image/town-house.png', '¥64000/sec', 0, 64000, 0),
      new Item('Mansion', 'other', 20, 250000000, './image/mansion-img.png', '¥50000/sec', 0, 50000, 0),
      new Item('Industrial Space', 'other', 10, 1000000000, './image/industrial-space-img.png', '¥2200000/sec', 0, 2200000, 0),
      new Item('Hotel Skyscraper', 'other', 5, 10000000000, './image/hotel-skyscraper-img.png', '¥25000000/sec', 0, 25000000, 0),
      new Item(
        'Bullet-Speed Sky Railway',
        'other',
        1,
        10000000000000,
        './image/bullet-speed-sky -railway-img.png',
        '¥30000000000/sec',
        0,
        30000000000,
        0
      ),
    ];

    let userData = new UserData(config.initialPage.querySelector('input[name="yourName"]').value, 20, 0, 50000, 0, Items);

    return userData;
  }

  static timeInterval(userData) {
    Controller.setTimer = setInterval(function () {
      Controller.countDays(userData);

      if (userData.perSecPrice > 0) {
        userData.money += userData.perSecPrice;
      }

      Controller.rewriteUserData(userData);
    }, 1000);
  }

  static stopTimer() {
    clearInterval(Controller.setTimer);
  }

  static countDays(userData) {
    userData.days++;
    if (userData.days % 365 === 0) {
      userData.age++;
    }
  }

  //ユーザーデータの更新
  static rewriteUserData(userData) {
    let age = config.mainPage.querySelector('#age');
    let days = config.mainPage.querySelector('#days');
    let money = config.mainPage.querySelector('#money');

    age.innerHTML = `${userData.age} years old`;
    days.innerHTML = `${userData.days} days`;
    money.innerHTML = `¥${userData.money}`;
  }

  //Burgerのクリックデータを更新
  static CountClickBurger(userData) {
    userData.burgers++;
    userData.money += userData.perClickPrice;
    Views.updateBurgersPage(userData);
    Views.updateUserInfoPage(userData);
  }

  //ユーザーデータのリセット
  static resetUserData(userData) {
    window.confirm('Reset All Data?');
    let newUser = Controller.initialUserData(userData.name);
    config.mainPage.innerHTML = '';
    Controller.stopTimer();
    Views.mainPage(newUser);
    Controller.timeInterval(newUser);
  }

  //アイテムの購入の処理
  static purchaseItem(userData, inputNum) {
    let index = config.mainPage.querySelector('#box-purchase-info').getAttribute('index');
    const userItem = userData.items[index];

    if (userData.money >= userItem.price * inputNum && inputNum <= userItem.maxQuantity - userItem.itemPurchaseCount) {
      if (userItem.type === 'click') {
        userItem.itemPurchaseCount += Number(inputNum);
        Controller.updateBurgerPrice(userData, index, inputNum);
        Views.updateBurgersPage(userData);
      } else {
        userItem.itemPurchaseCount += Number(inputNum);
        Controller.updateItemsPrice(userData, index, inputNum);
        Views.updateUserInfoPage(userData);
      }
    } else if (userData.money >= userItem.price * inputNum && userItem.type === 'stock') {
      userItem.itemPurchaseCount += Number(inputNum);
      Controller.updateStocksPrice(userData, index, inputNum);
      Views.updateUserInfoPage(userData);
    } else {
      alert('You can not buy item anymore');
    }
  }

  //Burgerの情報のアップデート処理
  static updateBurgerPrice(userData, index, inputNum) {
    const price = Number(userData.items[index].price) * inputNum;
    if (userData.money < price) {
      alert('You have not enough money to buy');
    } else {
      userData.money -= price;
      userData.perClickPrice += userData.items[index].perClick * inputNum;
      Views.updateUserInfoPage(userData);
    }
  }

  //Stockの情報のアップデート処理
  static updateStocksPrice(userData, index, inputNum) {
    const price = Number(userData.items[index].price) * inputNum;

    if (userData.money < price) {
      alert('You have not enough money to buy');
    } else if (userData.items[index].name === 'ETF Stock') {
      userData.money -= price;
      userData.items[index].price += userData.items[index].price * 0.1;
      userData.perSecPrice += Math.floor(Number(userData.items[index].price) * userData.items[index].perSec * inputNum);
      Views.updateUserInfoPage(userData);
    } else if (userData.items[index].name === 'ETF Bonds') {
      userData.money -= price;
      userData.perSecPrice += Math.floor(Number(userData.items[index].price) * userData.items[index].perSec * inputNum);
      Views.updateUserInfoPage(userData);
    }
  }

  //その他のアイテムの情報のアップデート処理
  static updateItemsPrice(userData, index, inputNum) {
    const price = Number(userData.items[index].price) * inputNum;

    if (userData.money < price) {
      alert('You have not enough money to buy');
    } else {
      userData.money -= price;
      userData.perSecPrice += userData.items[index].perSec;
      Views.updateUserInfoPage(userData);
    }
  }

  static totalItemPrice(userData, index, inputNum) {
    let totalItemPrice = config.mainPage.querySelector('#totalPrice');

    if (inputNum.value > 0) {
      userData.totalItemPrice = userData.items[index].price * inputNum.value;
      totalItemPrice.innerHTML = `total: ¥${userData.totalItemPrice}`;
    } else {
      userData.totalItemPrice = userData.totalItemPrice;
      totalItemPrice.innerHTML = `total: ¥0`;
    }
  }
}
Controller.startGame();
