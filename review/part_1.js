// Part 1

/*

// 1. What is an object factory? Give an example of one.
// An object factory is a function that returns new objects based on a pre-defined template.

function newObj(var1, var2) {
  return {
    var1,
    var2,
    sayHello() {
      console.log('Hello!');
    },
  }
}

let objectah = newObj('steve', 'human');
objectah.sayHello(); // Hello!

// 2. What are some of the disadvantages of an object factory?
// Factory functions have two main disadvantages. 1) there is no way to tell if the object was created by a factoy function. 2) Each object produced from the factory function will have their own copy of each method.

// 3. What is `this`?
// `this` refers to the calling object in the function or method, the execution context. The object reference by `this` in a function definition depends on how and where the function or method was invoked, and not how it was defined.

// 4. What is execution context?
// Execution context refers to the object that `this` represents during function execution. It is set when the function is invoked, and not how the function is defined.

// 5. What is strict mode, and how does it change how a program runs?
// When strict mode is used, the implicit context is not the global object, but rather undefined.
// Of note however, is that `this` when used in the global scope still points to the global object.

// 6. What are the benefits to using strict mode? When should you use it?
// Strict mode allows us to avoid accidentally making changes to the global object.

// 7. What is implicit function execution context?
// The implicit function execution context is the execution context for any method invoked without an explicit context provided (say by using `call` or `apply`). JS will implicitly bind methods invoked in this manner to the calling object.

// 8. What is explicit function execution context?
// Explicit execution context is when we use `call` or `apply` to explicitely execute a function with a particular object as it's context. We set the execution context by passing it in as an argument.

// 9. How can we change a function's execution context at execution time?
// We can change a function execution context by using the `call` or `apply` functions to set it explicitly.

// 10. What do `call()` and `apply()` do, and how are they different? Give an example of using each.
// call and apply both set the method executions context explicitly, however call expects a list of arguments, while apply expects them in an array.

let obj = {
  one: 'one',
  two: 'two',
  sayOneTwoThree(var1, var2) {
    console.log(this.one + ' ' + var1 + ' ' + var2);
  }
}

let otherObj = {
  one: 'eleven',
}

obj.sayOneTwoThree('two', 'three'); // one two three
obj.sayOneTwoThree.call(otherObj, 'two', 'three'); // eleven two three
obj.sayOneTwoThree.apply(otherObj, ['two', 'three']); // eleven two three

// 11. What is the global object, and how can we access it?
// The global object is the object which serves as the implicit execution context. Is created when JS starts running. `window` in the browser, and `global` in node.

// 12. What is the `bind()` method, and how does it differ from `call()` an `apply()`?
// `bind` returns a new function which has it's execution context permanently set to the passed in object.

// 13. Bind pp
// 14. What do we mean when we say a function can "lose it's context"? What are two ways a function can experience context loss? 

let objLoss = {
	someproperty: 'hello',
	someMethod() {
		console.log(this.someproperty);
	},
}

objLoss.someMethod(); // 'hello'
let outside = objLoss.someMethod; // assigns the method `someMethod` to `outside`.
outside(); // method invoked; 'undefined'

let objLoss2 = {
  a: '1',
  woo() {
    function nah() {
      console.log(this); // `global`
      console.log(this.a);
    }

    nah(); // calling object is `global` which does not have an `a` property defined.
  },
};

objLoss2.woo(); // undefined

let objLoss3 = {
  a: '3',
  woo() {
    function nah() {
      console.log(this); // `objLoss3`
      console.log(this.a);
    }

    nah.call(this); // calling object is `objLoss3` which does an `a` property defined.
  },
};

objLoss3.woo(); // 3

let objLoss4 = {
  a: '4',
  woo() {
		let self = this;
    function nah() {
      console.log(self); // `objLoss3`
      console.log(self.a); // references self.
    }

    nah(); // calling object is `global` which doesn't have an `a` property defined, but the code now references `self`.
  },
};

objLoss4.woo(); // 4

// 15. Context loss pp
// 16. Context loss pp
// 17. What is a closure? What are the benefits of closures, and how can we create one?
// A closure is the maintained references to variables used within a function and in scope to a function at the time the function is defined.

// 18. How can we use closures to create private data? Demonstrate how we can make a variable, `secretNumber` private, using a closure. Why should we use closures to make data private?
// We can use closure to create private data by defining the data within a function, and returning a new function that can reference it.

function secretMaker() {
  let secretNumber = 100;

  return function() {
    console.log(`I can access ${secretNumber}!`);
  };
}

let secretHolder = secretMaker();
secretHolder(); // I can access 100!

// We should use closures to make data Private as it forces other developers to use the intended interface, rather than manipulating the data itself directly.

// 19. What is garbage collection? Which values in JS participate in GC? Why do we need to be aware of garbage collection, as software engineers?
// Garbage collection is the process JS employs to autmatically free up memmory taken up by values that are no longer needed.
// JS GC applies to all values.
// It's important to remain aware of GC and how it works as we need to be cognizant of what will and wont be collected to avoid unnecessary memory usage.

// JS GC will remove from memory any variable that has a references count of 0.

// 20. In the following code, how can we retain access to the value `"Steve"`? When can JS garbage collect `"Steve"`? 

// ```jsx
// function makeHello(name) {
//   return function() {
//     console.log("Hello, " + name + "!");
//   };
// }

// let helloSteve = makeHello("Steve");
// ```

// - Notes
//     - After the code runs, `helloSteve` references a function that closed over the local variable `name`, which right now contains the string `"Steve"`. Since the closure must keep `name` around, the reference to `"Steve"` must also stick around, which means JS can't GC `"Steve"`. When we call `helloSteve` sometime later, it still has access to `name` and can log its value.
    
//     ```jsx
//     helloSteve();  // => Hello, Steve!
//     ```
    
//     - Before JS can garbage collect `"Steve"`, you must ensure nothing else in the program references `"Steve"`; that includes every closure that has access to the `"Steve"` string. That's not typically a concern, but if you find that you must remove a closure or other reference explicitly, you can assign `null` to the item that references it. For instance:
    
//     ```jsx
//     helloSteve = null;
//     ```
    
//     - That dereferences the closure shown above, which in turn dereferences `"Steve"` through the `name` variable. If nothing else now has a reference to `"Steve"`, JS is free to garbage collect it.
//     - If we modify the code above by introducing a variable prior to returning the anonymous function, the code returns an anonymous function that closes over both the `name` *and* `message` variables. Those variables, in turn, reference the strings `"Steve"` and `"Hello, Steve!"` respectively.
    
//     ```jsx
//     function makeHello(name) {
//       let message = "Hello, " + name + "!";
//       return function() {
//         console.log(message);
//       };
//     }
    
//     let helloSteve = makeHello("Steve");
//     ```
    
//     - Theoretically, this will prevent garbage collection on both strings. However, since `name` isn't referenced within the `helloSteve` function, depending on the browser, `"Steve"` might or might not be garbage collected.

// 21. What is an IIFE? Give an example. Why would we use an IIFE in code?
// IIFE's are immediately invoked function expressions. They are useful for creating a private scope and creating private data.

(function() {
  console.log(1);
})(); // 1

// 22. How can you call an IIFE with an argument?
// Arguments can be passed in just as any other function
(function(x) {
  console.log(x);
})(2); // 2

// 23. How can you use an IIFE to create a private scope? What problems does this solve?

// We can use an IIFE to create a private scope thanks to closure.

(function() {
  // everything here is a private scope.
  let names = [];

  console.log(names);
})(); // []

// console.log(names); // error names is not defined.

// 24. What is a first-class function? Give an example.

// First class functions are functions that are treated as variables and can be passed around as such. In the example below, we pass around the function assigned to bar, and assign it to `foo` as well.

function bar() {
  console.log('bar');
}

let foo = bar;
foo(); // 'bar'

// 25. What concept(s) does the following code demonstrate? How does this work?

// ```jsx
// function multiply(first, second) {
//   return first * second;
// }

// function makeMultiplyN(multiplicand) {
//   return function(number) {
//     return multiply(multiplicand, number);
//   }
// }
// ```

// This demoonstrate partial function application. Partial function application works by using closures. We do this by defining a function, that returns a new function, that calls a 3rd function with some of it's arguments already pre-supplied by the outer function. This reference to the pre-filled argument value provided by the outside function is maintained thanks to closure, resulting in the return function be able to call the 3rd function while providing atleast 1 fewer arguments.

// 26. What is partial function application, and what are the benefits of using it?

// Partial function application is when we return a new function from a function call, that then calls a 3rd function with some of it's arguments pre-supplied when the new function is created by the outer function.

// 27. Create a reusable function using partial function application.

function add(x, y) {
  return x + y;
}

function addx(x) { // Re usable function
  return function(n) {
    return add(x, n);
  }
}

let add5 = addx(5);
let add2 = addx(2);

console.log(add5(5)); // 10
console.log(add2(5)); // 7

// 28. What is the difference between a constructor function and a regular function?

// A Constructor function is meant to be called with the `new` keyword. Convention says that they should start with a capital letter, but this is not required.

// When we call a constructor with `new`, a new object is created within the function, and `this` is set to reference that new object. The newly created object will inherit from the constructor functions prototype.
// the new object represented by `this` is returned, unless another objet is explicitely returned.

// 29. What does the `new` operator do?

// the `new` operator provides `this` in the function context a new object, sets it's prototype to the functions prototype, executes the function body with the new object as `this`, and returns it.

// 30. What does the following code log to the console? Note: Remember we're running it in coderpad.

// ```jsx
// let a = 1;
// let foo;
// let obj;

// function Foo() {
//   this.a = 2;
//   this.bar = function() {
//     console.log(this.a);
//   };
//   this.bar();
// }

// foo = new Foo();

// foo.bar();
// Foo();

// obj = {};
// Foo.call(obj);
// obj.bar();

// console.log(this.a);
// ```

// 31. What will the following code log and why?

// ```jsx
// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword());
// ```

// - Answer
//     - True: Even though the swingSword method is defined on the prototype after the ninja object is created, the prototype chain lookup happens when the swingSword method is called on the object, and it can be found.

// 32. Implement the method described in the comments:

// ```jsx
// let ninjaA;
// let ninjaB;
// function Ninja() {
//   this.swung = false;
// }

// ninjaA = new Ninja();
// ninjaB = new Ninja();

// // Add a swing method to the Ninja prototype which
// // returns the calling object and modifies swung

// Ninja.prototype.swing = function () {
//   this.swung = true;
//   return this;
// }

// console.log(ninjaA.swing().swung);      // must log true
// console.log(ninjaB.swing().swung);      // must log true
// ```

// - Answer
    
//     ```jsx
//     let ninjaA;
//     let ninjaB;
//     function Ninja(){
//       this.swung = false;
//     }
    
//     ninjaA = new Ninja();
//     ninjaB = new Ninja();
    
//     Ninja.prototype.swing = function() {
//       this.swung = true;
//       return this;
//     };
    
//     console.log(ninjaA.swing().swung);
//     console.log(ninjaB.swing().swung);
//     ```
    

// 33. What does `Object.create` do, and how is it used?

// `Object.create`, creates a new object and sets that new objects prototype to the object we pass in.

// 34. What is the `function.prototype`? 

// Function.prototype returns the functions prototype object. This is the object is used by the function if it is used as a constructor, and is what the function will set the newly created objects prototype object to the object referenced by this Function property.

// 35. What is behavior delegation? How does JS implement inheritance differently than Ruby?

// Behavior delegation is how we can delegate the execution of methods or retreival of property values up the prototype chain. This is done by first checking the object itself for the requested property or method, and if it is not found, then continuing to search for it in teh current objects `prototype` object. It's this link or chain of objects that enables us to emmulate a class structure. Shared behaviors of all child objects can go in a parent object and be used.

// 36. What is OLOO? Give an example. What are the benefits to organizing your code this way?

// The OLOO style of object creation is embraces JavaScripts prototype object link model and creates new objects with a link to a "parent" object, setting the new objects prototype to this `template` object creation time. We do this by calling `ojbect.create(templateObj)` passing in the template object as an argument. We can option define a `init` method on this templateObj to set properties on the object itself.

// 37. What is the Pseudo-Classical Pattern? Give an example. What are the benefits to organizing your code this way?

// The Pseudo classical approach uses a constructor function, and places all shared behavior on that functions prototype object that is inherited by each new object. This also allows us to use the constructor property to view how the object was made.

// 38. What are some things we need to consider when designing our code? 

// 39. What's the difference between using OLOO/ the Pseudo-Classical Pattern and using factory functions? 

// The main difference between using the OLOO and Pseudo-Classical patterns vs factory functions is that there is only 1 copy of the shared behavior methods.

// 40. How does ES6 `class` syntax work? Give an example.

// ES6 introduces the class syntax, which enables us to define a class with shared behavior, and a constructor method to instantiate objects and set initial properties.

class Vehicle {
  constructor(type, wheels) {
    this.type = type;
    this.wheels = wheels;
  }

  define() {
    console.log(this.type + ' ' + this.wheels);
  }
}

let car = new Vehicle('car', 4);
car.define(); // car 4

// 41. How does inheritance work with `class` syntax?

// With ES6 class syntax, we can have a class inherit from a parent class by `extending` the class.

class Car extends Vehicle {

} // The `Car` class will inherit from `Vehicle`.

// 42. Write a constructor function. 

// 43. What is the prototype chain?

// The prototype chain is the chain of objects linked in their hidden [[prototype]] property. This is where behavior delegation continues searching for a property or method if not found in the initial object. The final Object in the prototype chain is Object.prototype. Calling Object.getPrototypeOf(Object.prototype)); returns null.

// 44. What is the `.constructor` property?

// The constructor property is set on an objects prototype object, and is set to point to the function that created the object. This property is able to be reset, so caution must be used.

let tobj = {
  a: 'tobja',
  log() {
    return this.a;
  },
}

let tobj2 = {
  a: 'tobj2',
  log() {
    return tobj.log.call(this);
  },
  bog() {
    return this;
  }
}

console.log(tobj2.bog()); // { a: 'tobj2', log: [Function: log], bog: [Function: bog] }
console.log(tobj2.log()); // tobj2

let outsideLog = tobj.log;

console.log(outsideLog()); // undefined.
console.log(tobj.log()); // 'tobja'

let tobj3 = Object.create(tobj);

tobj3.a = 'tobj3';

console.log(tobj3.log()); // 'tobj3'

let tobj4 = Object.create(tobj2);

tobj4.a = 'tobj4';

console.log(tobj4.log()); // 'tobj4'

*/