'use strict';

const config = {
  initialPage: document.getElementById('initialPage'),
  mainPage: document.getElementById('mainPage'),
  itemPage: document.getElementById('box-purchase'),
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
  constructor(name, maxQuantity, price, imgUrl, unitPrice) {
    this.name = name;
    this.maxQuantity = maxQuantity;
    this.price = price;
    this.imgUrl = imgUrl;
    this.unitPrice = unitPrice;
    this.itemCount = 0;
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
  }

  countDays() {
    this.days++;
    if (this.days % 365 === 0) {
      this.age++;
    }
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

    Control.startGame();
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
      <p class="burger-price">one click ¥${userData.perClickPrice}</p>
    `;

    return boxBurger;
  }

  static burgerImage(userData) {
    const container = document.createElement('div');
    container.classList.add('image');
    container.setAttribute('id', 'burger-count');

    container.innerHTML = `
      <img id="burgers-image" src="./image/burger-img.png" alt="" />
    `;

    let clickBurger = container.querySelector('#burgers-image');
    clickBurger.addEventListener('click', function () {
      Control.CountClickBurger(userData);
    });

    return container;
  }

  static userInfo(userData) {
    const boxRight = document.createElement('div');
    boxRight.classList.add('user-info');

    boxRight.innerHTML = `
      <p class="name">${userData.name}</p>
      <p id="age" class="age">${userData.age}</p>
      <p id="days" class="days">${userData.days.toString()}</p>
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
            <p class="Possession">0</p>
            <p class="get-money">${userData.items[i].unitPrice}</p>
          </div>
        </div>
      </div>
    `;
    }

    const purchaseItems = container.querySelectorAll('#purchase-item');
    const itemsBox = config.mainPage.querySelector('#purchaseItems');
    // console.log(itemsBox);

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
        <input class="input-quantity" type="number" placeholder="1" />
        <p class="total-price">total: $0</p>
      </div>
      <div class="back-next-buttons">
        <button id="go-back" class="go-back">Go Back</button>
        <button class="next">Purchase</button>
      </div>
    `;

    const purchaseItems = config.mainPage.querySelector('#purchaseItems');
    const goBackButton = container.querySelector('#go-back');

    goBackButton.addEventListener('click', function () {
      purchaseItems.innerHTML = '';
      purchaseItems.append(Views.boxPurchasePage(userData));
    });

    return container;
  }

  static resetSaveButton(userData) {
    const resetSaveButton = document.createElement('div');
    resetSaveButton.classList.add('reset-save-button');

    resetSaveButton.innerHTML = `
      <div class="reset-button">
        <img src="./image/reset-icon.png" alt="" />
      </div>
      <div class="save-button">
        <img src="./image/save-icon.png" alt="" />
      </div>
    `;

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

class Control {
  //MainPageへ遷移。
  static startGame() {
    displayNone(config.mainPage);

    //NEWボタン
    let newButton = document.getElementById('new-button');
    newButton.addEventListener('click', function () {
      let userData = new UserData(container.querySelector('input[name="yourName"]').value, 20, 0, 50000, 0);
      if (userData.name === '') {
        alert('Please put your name');
      } else {
        displayBlock(config.mainPage);
        displayNone(config.initialPage);
        Views.mainPage(Control.initialUserData());
        // Control.timeInterval(userData);
      }
    });
  }

  static initialUserData() {
    const Items = [
      new Item('Flip machine', 500, '15,000', './image/flip-machine-img.png', '¥25/click'),
      new Item('ETF Stock', '∞', '300,000', './image/stoks-img.png', '¥0.1/sec'),
      new Item('ETF Bonds', '∞', '300,000', './image/stoks-img.png', '¥0.7/sec'),
      new Item('Lemonade Stand', 1000, '30,000', './image/lemonade-img.png', '¥30/sec'),
      new Item('Ice Cream Truck', 500, '100,000', './image/ice-cream-img.png', '¥120/sec'),
      new Item('House', 100, '20,000,000', './image/house-img.png', '¥32000/sec'),
      new Item('TownHouse', 100, '40,000,000', './image/town-house.png', '¥64000/sec'),
      new Item('Mansion', 20, '250,000,000', './image/mansion-img.png', '¥50000/sec'),
      new Item('Industrial Space', 10, '1,000,000,000', './image/industrial-space-img.png', '¥2200000/sec'),
      new Item('Hotel Skyscraper', 5, '10,000,000,000', './image/hotel-skyscraper-img.png', '¥25000000/sec'),
      new Item('Bullet-Speed Sky Railway', 1, '10,000,000,000,000', './image/bullet-speed-sky -railway-img.png', '¥30000000000/sec'),
    ];

    let userData = new UserData(config.initialPage.querySelector('input[name="yourName"]').value, 20, 0, 50000, 0, Items);

    return userData;
  }

  static timeInterval(userData) {
    setInterval(function () {
      userData.countDays();

      Control.rewriteUserData(userData);
    }, 1000);
  }

  //ユーザーのデータを更新する。
  static rewriteUserData(userData) {
    let age = config.mainPage.querySelector('#age');
    let days = config.mainPage.querySelector('#days');

    age.innerHTML = `${userData.age}`;
    days.innerHTML = `${userData.days}`;
  }

  //バーガーのクリックデータを更新する
  static CountClickBurger(userData) {
    userData.burgers++;
    userData.money += userData.perClickPrice;
    Views.updateBurgersPage(userData);
    Views.updateUserInfoPage(userData);
  }
}

Views.startGamePage();
