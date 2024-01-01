// Prototypes and Prototypal Inheritance
/*

// 1

function getDefiningObject(object, propKey) {
  let definingObj = null;
  let prototype = object;

  while (!definingObj) {
    if (prototype.hasOwnProperty(propKey)) {
      return prototype;
    }
    prototype = Object.getPrototypeOf(prototype);
    if (prototype === Object.prototype) {
      break;
    } 
  }

  return definingObj;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null

// Alt solution, same general logic, just more concise

function getDefiningObject(object, propKey) {
  while (object && !object.hasOwnProperty(propKey)) {
    object = Object.getPrototypeOf(object);
  }

  return object;
}

// 2

function shallowCopy(object) {
  let result = Object.create(Object.getPrototypeOf(object));

  Object.getOwnPropertyNames(object).forEach(p => {
    result[p] = object[p];
  });

  return result;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

let baz = shallowCopy(bar);
console.log(baz.a);       // => 1
baz.say();                // => c is 3
console.log(baz.hasOwnProperty('a'));  // false
console.log(baz.hasOwnProperty('b'));  // false
console.log(baz.hasOwnProperty('c'));  // true
*/

// 3

function extend(destination) {
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i];
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        desitnation[prop] = source[prop];
      }
    }
  }
  return destination;
}

let foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Joe