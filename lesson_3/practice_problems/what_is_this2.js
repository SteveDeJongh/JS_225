// What is this? (2)

// 1

// This is myChildObject, which means that `this.count` in `myMethod` is undefined and therefor returns `undefined`.

// 2

// We could change the context by calling it:

let myObject = {
  count: 1,
  myChildObject: {
    myMethod() {
      return this.count;
    },
  },
};

myObject.myChildObject.myMethod(); // undefined

myObject.myChildObject.myMethod.call(myObject); // 1

// 3

let person = {
  firstName: 'Peter',
  lastName: 'Parker',
  fullName() {
    console.log(this.firstName + ' ' + this.lastName +
                ' is the Amazing Spiderman!');
  },
};

let whoIsSpiderman = person.fullName.bind(person);
whoIsSpiderman();

// Logs 'Peter Parker is teh amazing Spiderman!' because even though we are calling it in the global context, the function returned to `whoIsSpiderman` has it's context bound to the `person` object.

// 4

let computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    function specialDiscount() {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

console.log(computer.total()); // 3500

// To fix it, we need to call `specialDiscount` with the correct context. This is because nested functions lose the outer method's context.

let computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    function specialDiscount() {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount.call(computer);
  }
};

console.log(computer.total());

// There are a number of other ways to fix this, including using a `self` variable to store `this`, and use that value within the function call instead of `this`.