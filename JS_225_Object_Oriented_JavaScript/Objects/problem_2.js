// Buggy Code 2

/*
const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    this.price -= discount;

    return this.price;
  },
};


// > item.discount(20)   // should return 40
// = 40
// > item.discount(50)   // should return 25
// = 20
// > item.discount(25)   // should return 37.5
// = 15
*/

// The issue is that we are re-assigning the items price each time we discount it.
// Instead of reassiging the `price` property. The function could add a new property called `discountedPrice` and assign it to that value.

const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    this.discountedPrice = this.price - discount;

    return this.discountedPrice;
  },
};


// > item.discount(20)   // should return 40
// = 40
// > item.discount(50)   // should return 25
// = 20
// > item.discount(25)   // should return 37.5
// = 15

console.log(item.discount(20)); // 40
console.log(item.discount(50)); // 25
console.log(item.discount(25)); // 37.5
