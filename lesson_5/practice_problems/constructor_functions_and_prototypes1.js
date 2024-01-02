// Constructor Functions and Prototypes 1
/*
// 1

// 2
// 2
// 2
// 2
// 2
// 2

// Line 13 creates a new object foo with the constructor function. The constructor function calls the bar method while constructing the object, which logs 2 out. foo.bar() logs the next 2. With Foo(), we're calling the Foo function with the global object context which sets the global object's a to 2, and logs out the next 2. Foo.call(obj) adds the a property and the bar method to the obj object, then called the bar method, logging out the next 2. At this point, we can now call the bar method directly on obj so this logs out the fifth 2. Finally, since the global object's a property is already changed to 2, the last 2 is logged out.

// 2

// A)
// Logs NaN
// Logs NaN
// this in RECTANGLE.area and RECTANGLE.perimeter functions is set to the RECTANGLE object when they are called. Since RECTANGLE does not define width and height properties, both methods return NaN.

// B) fix the problem by calling the areas with an explicit context.

let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);
console.log(rect1.perimeter);

// 3

let Circle = function (r) {
  this.radius = r;
}

Circle.prototype.area =  function() {
  return Math.PI * this.radius * this.radius;
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27

// 4

let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword()); // true

// Even though the swingSword method is defined on the prototype after the ninja object is created, the prototype chain lookup happens when the swingSword method is called on the object, and it can be found.

// 5

let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword()); // Uncaught TypeError: ninja.swingSword is not a function

// Since `ninja` was assigned to a Ninja oject before we changed the object referenced by `prototype`, it references the old prototype object which does not have  a `swingSword` method.

// 6

let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

// Add a swing method to the Ninja prototype which
// returns the calling object and modifies swung

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true
*/

// 7

let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object
let ninjaB = new ninjaA.constructor
// Or
let ninjaC = Object.create(Object.getPrototypeOf(ninjaA));

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true
console.log(ninjaC.constructor === ninjaA.constructor);    // should log true