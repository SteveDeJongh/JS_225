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
*/

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