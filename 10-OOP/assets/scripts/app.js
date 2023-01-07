class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      attributes.forEach((attribute) => {
        rootElement.setAttribute(attribute.name, attribute.value);
      })
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total \$ ${this.totalAmount}</h2>`
  }

  get totalAmount() {
    const sum = this.items.reduce((previousValue, currentValue) => {
      return previousValue += currentValue.price;
    }, 0);
    return sum;
  }

  // 강의에서는 constructor 를 추가하는데,
  // 상속받으면 base class 의 constructor 가 동작함
  // 그래서 필요없다고 생각함. - 실제로 없어도 잘 동작함.
  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updateItems = [...this.items];
    updateItems.push(product);
    this.cartItems = updateItems;
  }

  order() {
    console.log('Order now!', this.items);
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart')
    cartEl.innerHTML = `
      <h2>Total \$ ${this.totalAmount}</h2>
      <button>Order Now!</button>
    `;
    cartEl.addEventListener('click', this.order.bind(this));

    this.totalOutput = cartEl.querySelector('h2');  //<h2>Total \$ ${this.totalAmount}</h2>
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.description}" />
          <div>
            <h2>${this.product.title}</h2>
            <h3>\$ ${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>ADD to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [
    new Product(
      'A Pillow',
      11,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9nq0DUaPM0eqChLtR93P5GziG52hA0CVgQ&usqp=CAU',
      'A Smile Pillow',
    ),
    new Product(
      'A Carpet',
      70,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRME9N-YSwN-umV28oidFp1EcT-nB5nc6P1Eg&usqp=CAU',
      'A Simple gray Carpet',
    ),
    new Product(
      'A Cup',
      8,
      'data:image/jpeg;base64,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',
      'A Blue Cup',
    ),
  ];

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);

    for (const prod of this.products) {
      const productItem = new ProductItem(prod, 'prod-list');
      productItem.render();
    }
  };
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart('app');
    this.cart.render();

    const productList = new ProductList('app');
    productList.render();

  }
}

class App {
  static cart;  // 가독성을 위해서 꼭 존재해야합니다.

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();