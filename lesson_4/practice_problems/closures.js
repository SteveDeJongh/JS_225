// Closures

// 1

function makeMultipleLister(num) {
  return function() {
    for (let i = 1; i < 100; i += 1) {
      if (i % num === 0) {
        console.log(i);
      }
    }
  }
}

let lister = makeMultipleLister(13);
lister();

// LS Solution, no need to check every number, instead just start and increment by number.

function makeMultipleLister(number) {
  return function () {
    let i;
    for (i = number; i < 100; i += number) {
      console.log(i);
    }
  };
}

// 2

let total = 0;

function add(num) {
  console.log(total += num);
}

function subtract(num) {
  console.log(total -= num);
}

add(1);
add(42);
subtract(39);
add(6);

// 3

function startup() {
  let status = 'ready';
  return function() {
    console.log('The system is ready.');
  };
}

let ready = startup();
// let systemStatus = // ?
// You can't, there is no way to access the value fo the variable from outside the function.