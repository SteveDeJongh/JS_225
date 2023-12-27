// Practice Problems: Object Orientation

// 1

// let scissors = {
//   id: 0,
//   name: 'Scissors',
//   stock: 8,
//   price: 10,
// };

// let drill = {
//   id: 1,
//   name: 'Cordless Drill',
//   stock: 15,
//   price: 45,
// };

// 2

function setProductPrice(item, newPrice) {
  if (newPrice >= 0) {
    item.price = newPrice;
  } else {
    alert("Invalid new Price");
  }
}

// 3

function describeProduct(product) {
  console.log('Name: ' + product.name);
  console.log('ID: ' + product.id);
  console.log('Price: $' + product.price);
  console.log('Stock: ' + product.stock);
}

// 4

// let scissors = {
//   id: 0,
//   name: 'Scissors',
//   stock: 8,
//   price: 10,
//   setPrice(newPrice) {
//     if (newPrice >= 0) {
//       this.price = newPrice;
//     } else {
//       alert("Invalid new Price");
//     }
//   },
//   describe() {
//     console.log(`Name: ${this.name}` +
//                 `ID: ${this.id}` +
//                 `Price: ${this.price}` +
//                 `Stock: ${this.stock}`);
//   },
// };

// let drill = {
//   id: 1,
//   name: 'Cordless Drill',
//   stock: 15,
//   price: 45,
//   setPrice(newPrice) {
//     if (newPrice >= 0) {
//       this.price = newPrice;
//     } else {
//       alert("Invalid new Price");
//     }
//   },
//   describe() {
//     console.log(`Name: ${this.name}` +
//                 `ID: ${this.id}` +
//                 `Price: ${this.price}` +
//                 `Stock: ${this.stock}`);
//   },
// };

// 5


function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    changePrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        alert("Invalid new Price");
      }
    },
    describeProduct() {
      console.log('Name: ' + this.name);
      console.log('ID: ' + this.id);
      console.log('Price: $' + this.price);
      console.log('Stock: ' + this.stock);
    },
  };
}

// Alternatively:

// function createProduct(id, name, stock, price) {
//   let newProduct = {};
//   newProduct.id = id;
//   newProduct.name = name;
//   newProduct.stock = stock;
//   newProduct.price = price;
//   newProduct.setPrice = function(newPrice) {
//     if (newPrice >= 0) {
//       this.price = newPrice;
//     } else {
//       alert('Invalid price!');
//     }
//   };

//   newProduct.describe = function() {
//     console.log('Name: ' + this.name);
//     console.log('ID: ' + this.id);
//     console.log('Price: $' + this.price);
//     console.log('Stock: ' + this.stock);
//   };

//   return newProduct;
// }

// 6

let scissors = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let saw = createProduct(2, 'Circular Saw', 12, 95);
let hammer = createProduct(3, 'Sledge Hammer', 78, 45);
let boxCutter = createProduct(4, 'Box Cutter', 41, 15);

scissors.describeProduct();