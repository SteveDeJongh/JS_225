// Lesson 4

/*

// Closures and Private Data

// 1

function makeCounterLogger(num) {
  return function(secondNum) {
    let increment = secondNum > num ? 1: -1;
    let found = false;

    for (let i = num; found === false; i += increment) {
      console.log(i);
      found = i === secondNum ? true : false; 
    }
  }
}

let countlog = makeCounterLogger(5);
countlog(8);
// 5
// 6
// 7
// 8
countlog(2);
// 5
// 4
// 3
// 2

// ALT LS solution

// function makeCounterLogger(start) {
//   return function(finish) {
//     let i;

//     if (start > finish) {
//       for (i = start; i >= finish; i -= 1) {
//         console.log(i);
//       }
//     } else {
//       for (i = start; i <= finish; i += 1) {
//         console.log(i);
//       }
//     }
//   };
// }

// 2

function makeList() {
  let items = [];

  return function(arg) {
    if (arg === undefined) {
      if (items.length === 0) {
        console.log('The list is empty');
      } else {
        items.forEach(x => {
          console.log(x);
        });
      }
    } else if (items.includes(arg)) {
      let index = items.findIndex(x => x === arg);
      console.log(`${items.splice(index, 1)} removed!`);
    } else {
      items.push(arg);
      console.log(`${arg} added!`);
    }
  }
}

let list = makeList();
list();
// The list is empty.
list('make breakfast');
// make breakfast added!
list('read book');
// read book added!
list();
// make breakfast
// read book
list('make breakfast');
// make breakfast removed!
list();
// read book

// LS Solution
function makeList() {
  let items = [];

  return function(newItem) {
    let index;
    if (newItem) {
      index = items.indexOf(newItem);
      if (index === -1) {
        items.push(newItem);
        console.log(newItem + ' added!');
      } else {
        items.splice(index, 1);
        console.log(newItem + ' removed!');
      }
    } else {
      if (items.length === 0) {
        console.log('The list is empty.');
      } else {
        items.forEach(function(item) {
          console.log(item);
        });
      }
    }
  };
}
*/

// Objects and Closures
/*

// 1

function makeList() {
  return {
    items: [],

    add: function(item) {
      let index = this.items.indexOf(item);
      if (index === -1) {
        this.items.push(item);
        console.log(item + ' added!');
      }
    },

    remove: function(item) {
      let index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
        console.log(item + ' removed!');
      } else {
        console.log('Item not found.');
      }
    },

    list: function() {
      if (this.items.length > 0) {
        this.items.forEach(x => console.log(x));
      } else {
        console.log("List is empty!");
      }
    },
  }
}

let list = makeList();

list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn

// 2

console.log(list.items); // ['corn'] // `items` array is accessible through itme property.

function makeList() {
  let items = [];

  return {
    add: function(item) {
      let index = items.indexOf(item);
      if (index === -1) {
        items.push(item);
        console.log(item + ' added!');
      }
    },

    remove: function(item) {
      let index = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
        console.log(item + ' removed!');
      } else {
        console.log('Item not found.');
      }
    },

    list: function() {
      if (items.length > 0) {
        items.forEach(x => console.log(x));
      } else {
        console.log("List is empty!");
      }
    },
  }
}

let list = makeList();

list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn

console.log(list.items); // undefined

*/

// How Closures Affect Garbage Collection

// 1

// [1] can be garbage collected after the function `add` is invoked.

// [2] can be GC'ed after the `run` function returns.

// [1,2] can be GC'ed only after the program ends. 

// 2

// Only when the program ends, or if `helloSteveAndEdie` is reassigned to null.

// Partial Function Application

// 1

function greet(arg1, arg2) {
  let capitalized = arg1[0].toUpperCase() + arg1.slice(1);
  console.log(capitalized + ', ' + arg2 + '!');
}

greet('howdy', 'Joe');
greet('good morning', 'Sue');

// 2

function partial(primary, arg1) {
  return function(arg2) {
    return primary(arg1, arg2);
  }
}

let sayHello = partial(greet, 'hello');
let sayHi = partial(greet, 'hi');

sayHello('Brandon');
sayHi('Sarah');