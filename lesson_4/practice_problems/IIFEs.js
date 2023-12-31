// IIFEs

// 1

// No, as the function defintion is not within parenthesis or assigned to a variable and therefor not an expression.

// 2

// (function() {
//   console.log("Sometimes, syntax isn't intuitive!")
// })();

// 3

// var sum = 0;
// var numbers;

// sum += 10;
// sum += 31;

// numbers = [1, 7, -3, 3];

// function sum(arr) {
//   return arr.reduce(function(sum, number) {
//     sum += number;
//     return sum;
//   }, 0);
// }

// sum += sum(numbers);  // Raises a type error, demonstrates a variable naming conflict.

// 4

function countdown(count) {
  (function(n) {
    for (let i = n; i >= 0; i -= 1) {
      console.log(i);
    }

    console.log('Done!');
  })(count);
}

countdown(7);

// 5

// No, although named, the function is not visible in outside of the scope created by the IIFE.

// 6

function recursiveCountdown(count) {
  (function recursiveSub(n) {
    console.log(n);

    if (n === 0) {
      console.log('Done!');
    } else {
      recursiveSub(n - 1);
    }
  })(count);
}

recursiveCountdown(7);