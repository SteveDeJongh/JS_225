/*

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

obj2.showNums()

*/
/*

// Object Creation Patterns

// Object Factories / Factory functions / Factory Object Creation Pattern

function createObject(parameter1, parameter2) {
	return {
		name: parameter1,
		type: parameter2,
		// ...
    sayWhatIam() {
      console.log("I'm created by a object factory!");
    },
  };
}

let obj1 = createObject('obj1', 'object factory');
obj1.sayWhatIam(); // I'm created by object factory!
console.log(obj1); // { name: 'obj1', type: 'object factory', sayWhatIAm: [Function ...] }

// Contructor Pattern

function ConstructorPattern(parameter1, parameter2) {
  this.name = parameter1;
  this.type = parameter2;
  this.sayWhatIam = function() {
    console.log("I'm created by a Constructor Pattern.");
  }
}

let obj2 = new ConstructorPattern('obj2', 'Constructor Pattern')
obj2.sayWhatIam(); // I'm created by a Constructor Pattern.
console.log(obj2); // { name: 'obj2', type: 'Constructor Pattern', sayWhatIAm: [Function ...] }

// The Prototype Pattern

function PrototypePattern() {
}

PrototypePattern.prototype.sayWhatIAm = function() {
  console.log("I'm created by a constructor and assigned behaviors via the prototype pattern.");
}
let obj3 = new PrototypePattern('obj3', 'Prototype Pattern');
obj3.name = 'obj3';
obj3.type = 'Prototype Pattern';
obj3.sayWhatIAm(); // I'm created by a constructor and assigned behaviors via the prototype pattern.
console.log(obj3); // { name: 'obj3', type: 'Prototype Pattner'} // Behavior is not on the object itself, but in it's prototype.

// The Pseudo-classical Pattern

function PseudoClassical(parameter1, parameter2) {
  this.name = parameter1;
  this.type = parameter2;
}

PseudoClassical.prototype.sayWhatIAm = function() {
  console.log("I'm created by a pseudo-classical function.");
}

let obj4 = new PseudoClassical('obj4', 'Pseudo-classical');
obj4.sayWhatIAm(); // I'm created by a pseudo-classical function.
console.log(obj4); // PseudoClassical { name: 'obj4', type: 'Pseudo-classical' } // No methods, they are assigned to the prototype object.

// OLOO Objects linking Other Objects

// let ProtoObj = { // shared behavior goes in the prototype object. // Capitalized name for the prototype as convention.
//   sayWhatIAm() {
//     console.log("I'm created by a OLOO pattern.");
//   },
// }

// let obj5 = Object.create(ProtoObj);

// obj5.name = 'obj5';
// obj5.type = 'OLOO';

// obj5.sayWhatIAm(); // I'm created by a OLOO patttern.
// console.log(obj5); // { name: 'obj5', type: 'OLOO' } // behavior is not in the new object itself, but found in it's prototype.

// With optional `init` method.

let ProtoObj = { // shared behavior goes in the prototype object. // Capitalized name for the prototype as convention.
  sayWhatIAm() {
    console.log("I'm created by a OLOO pattern.");
  },
	// ... other code ommitted
	init(parameter1, parameter2) {
		this.name = parameter1;
		this.type = parameter2;
		return this;
	},
}

let obj5 = Object.create(ProtoObj).init('obj5', 'OLOO');
obj5.sayWhatIAm(); // I'm created by a OLOO pattern.
console.log(obj5); // { name: 'obj5', type: 'OLOO' } // behavior is not in the new object itself, but found in it's prototype. 

// Closures

function makeBike(b) { // returns an object whose methods maintain access to `parts` and `brand` via closure.
  let parts = [];
  let brand = b;

  return {
    getBrand() {
      console.log(brand);
    },

    getParts() {
      console.log(parts);
    },

    addPart(p) {
      parts.push(p);
    },
  };
}

let bike = makeBike('kona');
console.log(bike.brand); // undefined
bike.getBrand(); // 'kona'
bike.addPart('frame');
bike.getParts(); // ['frame']

bike.clearParts = function() {
  // console.log(parts); // parts is not defined.
	parts = []; // changes the global property `parts` to an empty array.
}

bike.clearParts();
console.log(global.parts); // [];
bike.getParts();

// GC and Closures

function makeHi(name) {
	return function() {
		console.log('Hi ' + name);
	}
}

let hi = makeHi('steve');
hi(); // 'Hi steve'

// Partial function application

function talkTwo(string1, string2) {
	console.log(string1, string2);
}

function generator(func, arg1) {
  return function(arg2) {
		return func(arg1, arg2)
	};
}

let makeABoo = generator(talkTwo, 'Boo');
makeABoo('who'); // logs 'Boo Who'

// Object prototype chaining

function Animal() {
  this.type = 'mamal';

  // this.breath = function() {
  //   console.log('breathing!');
  // };
}

let animal = new Animal(); 

// lets instead assign the `breath` function to the `Animal.prototype`

Animal.prototype.breath = function() {
  console.log("I'm breathing");
}

console.log('Animal object:', animal); // Animal { type: 'mamal' }
// Now, each new animal won't have a separate `breath` method but will still have access to it.
animal.breath(); // 'I'm breathing!'

function Dog() {
  this.animal = 'dog'
}
Dog.prototype = new Animal(); // object created by `Dog` will now also have a `type` property.

function Terrior() {

}
Terrior.prototype = Object.create(Dog.prototype); // `type` property is not carried, only the behaviors from `Animal.prototype` are delagated.

Dog.prototype.constructor = Dog; // resetting the constructor property for Dog objects.
let dog = new Dog();

console.log('Prototype object of `dog`:', Object.getPrototypeOf(dog)); // Animal { type: 'mamal', constructor: [Function: Dog] }
console.log('Dog constructor:', dog.constructor); // [Function: Dog]
console.log('dog object:', dog); // Dog { animal: 'dog' }

Terrior.prototype.constructor = Terrior;
let terrior = new Terrior();
console.log('Prototype of terrior:', Object.getPrototypeOf(terrior)); // {constructor: [Function: Terrior]}
console.log('Construcotr of terrior:', terrior.constructor); // [Function: Terrior]
console.log('terrior:', terrior); // Terrior {}

// Class Syntax

class Vehicle {
	constructor(wheels) {
		this.wheels = wheels;
	}

	howManyWheels() {
		console.log(this.wheels);
	}

	static getDescription() {
		console.log(`A vehicle has a number of wheels and rolls`);
	}
	
	static descriptionProperty = 'A vehicle description property';
}

let vehicle = new Vehicle(4); // instantiating a new object using the `new` keyword.
vehicle.howManyWheels(); // logs '4'
Vehicle.getDescription(); // `A vehicle has a number of wheels and rolls` // Calling a static method on the class itself.
console.log(Vehicle.descriptionProperty); // 'A vehicle description property';

class Car extends Vehicle {
	constructor(wheel, type) {
		super(wheel);
		this.type = type;
	}

  whatType() {
    console.log('This car is a ' + this.type + ' and has a wheel count of: ' + this.wheels + '.')
  }
}

let car = new Car(4, 'coupe');
car.howManyWheels(); // 4
car.whatType(); // This car is a coupe and has a wheel count of: 4.

let objLoss2 = {
  a: '2',
  woo() {
    function nah() {
      console.log(this.a); // global.a
    }

    nah(); // calling object is `global` which does not have an `a` property defined.
  },
};

objLoss2.woo(); // undefined

// Fixes:
// Using call();

let objLoss3 = {
  a: '3',
  woo() {
    function nah() {
      console.log(this.a);
    }

    nah.call(this); // calling object is `objLoss3` which does an `a` property defined.
  },
};

objLoss3.woo(); // 3

// Using a in-scope `self` variable.

let objLoss4 = {
  a: '4',
  woo() {
		let self = this;
    function nah() {
      console.log(self.a); // references self.
    }

    nah(); // calling object is `global` which doesn't have an `a` property defined, but the code now references `self`.
  },
};

objLoss3.woo(); // 4

// 

function sayNumber() {
	let number = { // number holds a reference to the object that contains `val`. Let's call this `RefA`.
		val: 0,
	};
	console.log(number.val);
	return number; // We return the `RefA` from the function.
}

let returnedNumber = sayNumber(); // The return value, number, which holds`RefA` is assigned to `returnedNumber`. `returnedNumber` now also holds `RefA`.

// Once this code is run, we now have two variables that point to the same object reference, but only 1 of teh variables remain accessible.

// Does this mean that the variable `number` within the `sayNumber` function and it's copy of the object reference are eligible for GC?

// I understand that the object referenced by `number` is not eligible, as it's a same object now referenced by `returnedNumber`, but I'm curious about the storage of the reference to the object in the function.

let obj1 = {
  step: 'hello',
};

let obj2 = Object.create(obj1);

console.log(Object.getPrototypeOf(obj2)); // Point to the same object.
console.log(obj2.__proto__); // Point to the same object.

// Behvaior Delegation

let sharedBehaviors = { // the object we place the shared behavior on.
	speak() {
		console.log('Speaking!');
	},

	walk() {
		console.log('Walking!');
	},
}

let person = Object.create(sharedBehaviors);  // setting the new objects prototype to `sharedBehaviors`
let child = Object.create(sharedBehaviors);

person.walk(); // Walking! // the `person` object will not find a walk method within itself, and `delegates` to their prototype object.
child.walk(); // Walking!

person.speak(); // Speaking!
child.speak();  // Speaking!

child.speak = function() { // overriding the default behavior by setting a new `speak` function on the object itself.
	console.log('Now yelling!');
}

child.speak(); // Now yelling! // finds a `speak` method in the `child` object itself.

*/

let ProtoObj = { // shared behavior goes in the prototype object. // Capitalized name for the prototype as convention.
  sayWhatIAm() {
    console.log("I'm created by a OLOO pattern.");
  },
}

let obj5 = Object.create(ProtoObj);

console.log(obj5.constructor); // [Function: Object]

function PseudoClassical(parameter1, parameter2) { // constructor function.
  this.name = parameter1;
  this.type = parameter2;
}

PseudoClassical.prototype.sayWhatIAm = function() { // Shared `PseudoClassical` object behaviors added to constructors prototype property. 
  console.log("I'm created by a pseudo-classical function.");
}

let obj4 = new PseudoClassical('obj4', 'Pseudo-classical');

console.log(obj4.constructor); // Function: PseudoClassical