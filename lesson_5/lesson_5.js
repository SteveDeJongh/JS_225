// Lesson 5: Ojbect Creation Patterns

/*
// Constructor Pattern

// 1

// Construcot functions should be capitalized.

// 2

// function Lizard() {
//   this.scamper = function() {
//     console.log("I'm scampering!");
//   };
// }

// let lizzy = Lizard();
// lizzy.scamper(); // ?

// Will raise an error, as the `samper` property is undefined on `lizzy`. This is the case because `lizard` was invoked with the `new` operator and since ther eis no explciitt return value, the return value is undefined. As a result, the value assigned ot `lizzy` is undefined, and consequently calling `lizzy.scamper()` reuslts in an error since it is attempting to call the `scamper` method on `undefined`.

// 3

function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard(); // added the `new` keyword.
lizzy.scamper(); // ?
*/

// Objects and Prototypes

// 1

let prot = {};

let foo = Object.create(prot);

// 2

console.log(Object.getPrototypeOf(foo) === prot); // true

// 3
console.log(prot.isPrototypeOf(foo)); // true

// 4

prot.isPrototypeOf(foo);
console.log(Object.prototype.isPrototypeOf(foo)); // true