// Part 1

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
// Factory functons have two main disadvantages. 1) there no way to tell what function created the object. 2) Each object produced from the factory function will have their own copy of each method.

// 3. What is `this`?
// `this` refers to the calling object/execution context. The object reference by `this` in a function definition depends on how and where the function or method was called.

// 4. What is execution context?
// Execution context refers to the object that `this` represents during function execution. It is set when the function is invoked, and not how the function is defined.

// 5. What is strict mode, and how does it change how a program runs?
// When strict mode is used, the implicit context is not the global object, but rather undefined.
// Of note however, is that `this` when used in the global scope still points to the global object.

// 6. What are the benefits to using strict mode? When should you use it?
// Strict mode allows us to avoid accidentally making changes to the global object.

// 7. What is implicit function execution context?
// The implicit function execution context is the execution context for any method invoked without an explciit context provided. JS will implicitly bind methods invoked in this manner to the calling object.

// 8. What is explicit function execution context?
// Explicit execution context is when we use `call` or `apply` to explicitely execute a function with a particular object as it's context.

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

// 22. How can you call an IIFE with an argument? 

// 23. How can you use an IIFE to create a private scope? What problems does this solve?

// 24. What is a first-class function? Give an example.

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

// 26. What is partial function application, and what are the benefits of using it?

// 27. Create a reusable function using partial function application.

// 28. What is the difference between a constructor function and a regular function?

// 29. What does the `new` operator do?

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

// 34. What is the `function.prototype`? 

// 35. What is behavior delegation? How does JS implement inheritance differently than Ruby?

// 36. What is OLOO? Give an example. What are the benefits to organizing your code this way?

// 37. What is the Pseudo-Classical Pattern? Give an example. What are the benefits to organizing your code this way?

// 38. What are some things we need to consider when designing our code? 

// 39. What's the difference between using OLOO/ the Pseudo-Classical Pattern and using factory functions? 

// 40. How does ES6 `class` syntax work? Give an example.

// 41. How does inheritance work with `class` syntax?

// 42. Write a constructor function. 

// 43. What is the prototype chain?

// 44. What is the `.constructor` property?