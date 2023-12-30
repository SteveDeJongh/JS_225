// Higher Order Functions

// 1

// A higher order function can either take a function as an argument, return a function, or both.

// 2

// filter is a higher-order function as it can receive a function as an argument.

// 3

let numbers = [1, 2, 3, 4];
function makeCheckEven() {
  return function(number) {
    return number % 2 === 0;
  }
}

let checkEven = makeCheckEven();

numbers.filter(checkEven); // [2, 4]

// 4

function execute(func, operand) {
  return func(operand);
}

execute(function(number) {
  return number * 2;
}, 10); // 20

execute(function(string) {
  return string.toUpperCase();
}, 'hey there buddy'); // "HEY THERE BUDDY"

// 5

function makeListTransformer(func) {
  return function(collection) {
    return collection.map(func);
  }
}

let timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

timesTwo([1, 2, 3, 4]); // [2, 4, 6, 8]