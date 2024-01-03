// Classes
/*

// 1

class Cat {
  constructor() {
    console.log("I'm a cat!");
  }
}

let kitty = new Cat();

// 2

class Cat {
  constructor(name = 'Kitty') {
    this.name = name;
    console.log(`I'm a cat! My name is ${this.name}.`);
  }
}

let kitty = new Cat();
let caterator = new Cat('Cat mastah');

// 3

class Cat {
  constructor(name = 'Kitty') {
    this.name = name;
  }

  greet() {
    console.log(`I'm a cat! My name is ${this.name}.`);
  }

  rename(newName) {
    this.name = newName;
  }
}

let kitty = new Cat();
kitty.greet(); // I'm a cat! My name is Kitty.
kitty.rename('Cat mastah');
kitty.greet(); // I'm a cat! My name is Cat mastah.

// 4

class Cat {
  constructor(name = 'Kitty') {
    this.name = name;
  }

  greet() {
    console.log(`I'm a cat! My name is ${this.name}.`);
  }

  rename(newName) {
    this.name = newName;
  }

  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}

Cat.genericGreeting();

// 5

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

// 6

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25

// 7

class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}
console.log(Cat.prototype); // {}
console.log(Cat.prototype.constructor); // [Class Cat]
let fakeCat = Object.create(Cat.prototype);// your implementation
console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.

// 8

class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat extends Pet {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }

  info(){
    console.log(`My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`)
  }
}

let pudding = new Cat('Pudding', 7, 'black and white');
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

// 9

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'Dog', status)
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'Cat', status)
  }

  introduce() {
    return `${super.introduce()} Meow meow!`;
  }
}

let cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

let dog = new Dog('Gryff', 3, 'happy', 'Steve');
console.log(dog.greetMaster());
console.log(dog.introduce());

// 10

class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }

  getWheel() {
    return this.wheels;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle{
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}

// 11

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData()); // 'ByeBye'
console.log(thing.dupData()); // 'HelloHello'

// 12

// function Person() {}
// Person.prototype.greeting = function(text) {
//   console.log(text);
// }

// function Shouter() {
//   Person.call(this);
// }

// Shouter.prototype = Object.create(Person.prototype)
// Shouter.prototype.greeting = function(text) {
//   Person.prototype.greeting.call(this, text.toUpperCase());
// }

class Person{
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person{
  greeting(text){
    super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.

// 13

class Pet{
  constructor(animal, name) {
    this.animal = animal;
    this.name = name;
  }

  info() {
    return `a ${this.animal} named ${this.name}`;
  }
}

class Owner{
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets(){
    return this.pets.length;
  }

  adopt(pet) {
    this.pets.push(pet);
  }

  printPets() {
    this.pets.forEach(pet => console.log(pet.info()));
  }
}

class Shelter{
  constructor(){
    this.owners = {};
  }

  adopt(owner, pet) {
    owner.adopt(pet);
    if (!this.owners[owner.name]) {
      this.owners[owner.name] = owner;
    }
  }

  printAdoptions(){
    // Object.keys(this.adoptions).forEach(owner => {
    //   console.log(`${owner} has adopted the following pets:`)
    //   this.adoptions[owner].forEach(pet => {
    //     console.log(pet.info());
    //   });
    //   console.log('')
    // })

    for (let name in this.owners) {
      console.log(`${name} has adopted the following pets:`);
      this.owners[name].printPets();
      console.log('');
    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// 14

class Banner {
  constructor(message) {
    this.message = message;
    this.width = message.length;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.width)}-+`;
  }

  emptyLine() {
    return `| ${' '.repeat(this.width)} |`;
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+

*/