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

// function switchPage(pageShow, PageNone) {
//   displayNone(PageNone);
//   displayBlock(pageShow);

//   return pageShow;
// }

class Item {
  constructor(name, maxQuantity, price, imgUrl, unitPrice) {
    this.name = name;
    this.maxQuantity = maxQuantity;
    this.price = price;
    this.imgUrl = imgUrl;
    this.unitPrice = unitPrice;
  }
}

class UserData {
  constructor(name, age, days, money, burgers, items, itemIndex) {
    this.name = name;
    this.age = age;
    this.days = days;
    this.money = money;
    this.burgers = burgers;
    this.items = items;
    this.itemIndex = itemIndex;
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

    //左側のboxを表示
    container.append(Views.burgersInfo(userData));

    //右側のboxを表示
    let boxRight = document.createElement('div');
    boxRight.classList.add('box-right');
    boxRight.setAttribute('id', 'boxRight');

    let boxContainer = document.createElement('div');
    boxContainer.classList.add('box-container');
    boxContainer.setAttribute('id', 'box-container');
    // boxContainer.append(Views.boxPurchasePage(userData), Views.itemInfoPage(userData, 0));
    boxContainer.append(Views.boxPurchasePage(userData));

    boxRight.append(Views.userInfo(userData));
    boxRight.append(boxContainer);
    boxRight.append(Views.resetSaveButton(userData));

    // boxRight.append(Views.userInfo(userData), boxContainer, Views.resetSaveButton(userData));

    container.append(boxRight);
    config.mainPage.append(container);

    // Control.moveItemInfoPage(userData);
    // Control.backToMainPage(userData);
    // Control.burgerCount(userData);
  }

  static burgersInfo(userData) {
    let boxLeft = document.createElement('div');
    boxLeft.classList.add('box-left');

    boxBurger.innerHTML = `
      <div class="count-burgers">
        <p id="burgers" class="burgers">${userData.burgers} Burgers</p>
        <p class="burger-price">one click $25</p>
      </div>
      <div class="image">
        <img id="burgers-image" src="./image/burger-img.png" alt="" />
      </div>
    `;

    return boxBurger;
  }

  static userInfo(userData) {
    const boxRight = document.createElement('div');
    boxRight.classList.add('box-info');

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
            <p class="item-price">$${userData.items[i].price}</p>
          </div>
          <div class="item-count">
            <p class="Possession">0</p>
            <p class="get-money">${userData.items[i].unitPrice}</p>
          </div>
        </div>
      </div>
    `;
    }

    // const boxContainer = container.querySelector('#box-container');
    // const purchaseItems = container.querySelector('#purchase-item');
    // const boxPurchase = container.querySelectorAll('#box-purchase');
    // const items = container.querySelector('.purchase-item');
    // console.log(items);

    // for (let i = 0; i < items.length; i++) {
    //   items[i].addEventListener('click', function () {
    //     // displayNone(boxPurchase);
    //     boxPurchase.innerHTML = '';
    //     // boxPurchase.innerHTML = '';
    //     // displayBlock(purchaseInfo);
    //     boxContainer.append(Views.itemInfoPage(userData, i));
    //   });
    // }

    return container;
  }

  static itemInfoPage(userData, index) {
    const container = document.createElement('div');
    container.classList.add('box-purchase-info'); //, 'displayNone'
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
      new Item('Flip machine', 500, '15,000', './image/flip-machine-img.png', '¥25/click', 0),
      new Item('ETF Stock', '∞', '300,000', './image/stoks-img.png', '¥0.1/sec', 1),
      new Item('ETF Bonds', '∞', '300,000', './image/stoks-img.png', '¥0.7/sec', 2),
      new Item('Lemonade Stand', 1000, '30,000', './image/lemonade-img.png', '¥30/sec', 3),
      new Item('Ice Cream Truck', 500, '100,000', './image/ice-cream-img.png', '¥120/sec', 4),
      new Item('House', 100, '20,000,000', './image/house-img.png', '¥32000/sec', 5),
      new Item('TownHouse', 100, '40,000,000', './image/town-house.png', '¥64000/sec', 6),
      new Item('Mansion', 20, '250,000,000', './image/mansion-img.png', '¥50000/sec', 7),
      new Item('Industrial Space', 10, '1,000,000,000', './image/industrial-space-img.png', '¥2200000/sec', 8),
      new Item('Hotel Skyscraper', 5, '10,000,000,000', './image/hotel-skyscraper-img.png', '¥25000000/sec', 9),
      new Item('Bullet-Speed Sky Railway', 1, '10,000,000,000,000', './image/bullet-speed-sky -railway-img.png', '¥30000000000/sec', 10),
    ];

    let userData = new UserData(config.initialPage.querySelector('input[name="yourName"]').value, 20, 0, 50000, 0, Items);

    return userData;
  }

  // static moveItemInfoPage(userData) {
  //   const boxContainer = config.mainPage.querySelector('#box-container');
  //   const purchaseItems = config.mainPage.querySelectorAll('#purchase-item');
  //   const boxPurchase = config.mainPage.querySelector('#box-purchase');
  //   // const purchaseInfo = config.mainPage.querySelector('#box-purchase-info');

  //   for (let i = 0; i < purchaseItems.length; i++) {
  //     purchaseItems[i].addEventListener('click', function () {
  //       displayNone(boxPurchase);
  //       boxPurchase.innerHTML = '';
  //       // boxPurchase.innerHTML = '';
  //       // displayBlock(purchaseInfo);
  //       boxContainer.append(Views.itemInfoPage(userData, i));
  //     });
  //   }
  // }

  static backToMainPage(userData) {
    const purchaseInfo = config.mainPage.querySelector('#box-purchase-info');
    const boxPurchase = config.mainPage.querySelector('#box-purchase');
    const goBackButton = config.mainPage.querySelector('#go-back');

    console.log(purchaseInfo);

    // goBackButton.addEventListener('click', function () {
    //   displayNone(purchaseInfo);
    //   displayBlock(boxPurchase);
    // });
  }

  static burgerCount(userData) {
    const burgersImage = config.mainPage.querySelector('#burgers-image');
    burgersImage.addEventListener('click', function () {
      userData.burgers++;
      Control.rewriteUserData(userData);
    });
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
    let burgers = config.mainPage.querySelector('#burgers');

    age.innerHTML = `${userData.age}`;
    days.innerHTML = `${userData.days}`;
    burgers.innerHTML = `${userData.burgers} Burgers`;
  }
}

Views.startGamePage();

// container.innerHTML += `
//   <div id="boxRight" class="box-right">
//     <div class="box-info">
//       <p class="name">${userData.name}</p>
//       <p id="age" class="age">${userData.age}</p>
//       <p id="days" class="days">${userData.days.toString()}</p>
//       <p id="money" class="money">¥${userData.money}</p>
//     </div>
//     <div id="boxPurchase" class="box-purchase">
//       <div id="purchase-item" class="purchase-item">
//         <div class="purchase-img">
//           <img src="./image/burger-img.png" alt="" />
//         </div>
//         <div class="purchase-info">
//           <div class="items-info">
//             <p class="item-name">Flip machine</p>
//             <p class="item-price">$15000</p>
//           </div>
//           <div class="item-count">
//             <p class="Possession">0</p>
//             <p class="get-money">$25 / click</p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div class="reset-save-button">
//       <div class="reset-button">
//         <img src="./image/reset-icon.png" alt="" />
//       </div>
//       <div class="save-button">
//         <img src="./image/save-icon.png" alt="" />
//       </div>
//     </div>
//   </div>
// `;
