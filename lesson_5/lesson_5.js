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

// Prototypal Inheritance and Behavior Delegation

// 1 logs '1'

// 2 logs '2'

// 3 No. To check that `myProp` is actually a property of `far`, we can call hasOwnProperty('myProp') on `far`, or we can see if myProp is in the list returned by calling Object.getOwnPropertyNames(far).

//https://www.youtube.com/watch?v=-N9tBvlO9Bo

function UserCreator(name, points) {
  this.name = name;
  this.points = points;
}

UserCreator.prototype.add = function() {
  this.points += 1;
}

console.log(UserCreator.prototype); // {add: [Function (anonymous)]}
console.log(UserCreator.name); // UserCreator (Constructor functions name)

const user = new UserCreator('steve', 1);

console.log(user); // {name = 'steve'...}
console.log(user.constructor); // Function: UserConstructor
console.log(user.constructor.prototype) // {add: [Function (anonymous)]}

// Static and Instance Properties and Methods

// The Pseudo-classical PAttern and the OLOO Pattern

// 1

let PetPrototype = {
  sleep: function() {
    console.log('I am sleeping');
  },

  wake: function() {
    console.log('I am awake');
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name; 
    return this; 
  },
}

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

// 2

function Pet(animal, name) {
  this.animal = animal;
  this.name = name;
}

Pet.prototype.sleep = function() {
  console.log('I am sleeping');
}

Pet.prototype.wake = function() {
  console.log('I am awake');
}

let pudding = new Pet('Cat', 'Pudding');
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = new Pet('Fish', 'Neptune');
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

// The Class Syntactic Sugar

// https://launchschool.com/gists/6ba85481
// https://launchschool.com/gists/cdba6a8e

// More Methods on the Object Constructor

function newPerson(name) {
  let obj = {
    name: name,
  };

  Object.defineProperties(obj, {
    log: {
      value: function() {
      console.log(this.name);
      },
      writable: false,
    },
  });

  return obj;
}

// More concise
function newPerson(name) {
  return Object.defineProperties({ name: name }, {
    log: {
      value() {
        console.log(this.name);
      },
      writable: false
    },
  });
}

let me = newPerson('Shane Riley');
me.log();     // => Shane Riley
me.log = function() { console.log('Amanda Rose'); };
me.log();     // => Shane Riley

// Object.freeze

// The arrays and objects within the `frozen` object are not immutable as Object.freeze only freezes the reference to the object, and not the object itself.
*/

// let obj = {};
// let obj2 = Object.create(obj);

// console.log(Object.getPrototypeOf(obj2) === obj); // true

// 
// function Dog() { // Constructor function
//     this.name = 'Gryff';
// }

// let pup = new Dog();

// console.log(pup); // Dog { name: 'Gryff' }
// console.log(Dog.prototype.constructor); // [Function: Dog]
// console.log(pup.__proto__); // {}
// console.log(pup.__proto__.constructor) // [Function: Dog]
// console.log(pup.prototype); // undefined
// console.log(Dog.prototype.constructor);
// console.log(Dog.__proto__.constructor);

// Overcoming Context Loss

let obj = {
	numbers: [1,2,3],
	showNums() {
		let counters = [1,2,3];
		counters.forEach(function(_) {
      console.log(this); // `this` references the global object.
		}
	)},
};

obj.showNums();

let obj2 = {
	numbers: [1,2,3],
	showNums() {
		let counters = [1,2,3];
		let that = this;
		counters.forEach(function(_) {
      console.log(that); // `that` references the `obj2` object.
		}
	)},
};

obj2.showNums();