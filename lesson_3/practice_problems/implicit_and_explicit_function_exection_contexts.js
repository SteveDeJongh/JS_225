// Implit and Explicit Function Executions contexts

// 1

// window

// 2

// undefined

// 3

// {foo: f}

// 4

// 'Hello from the global scope!'
// 'Hello from the function scope!'

// 5

// This code logs 20 and 0. This is because `this` in the first `add()` function invocation refers to the globla object, which has an `a` proprety defined thanks to the use of `var` on `line 1`.
// We then invoked the `add()` method, added to the object `c` on `line 12`, by `c.add()`. This makes the implicit execution context of the method the `c` object. Within the method, we use the `c` object propety value of `a` (-10) for the first value, and then the outer scoped variable `b`'s value of `10` for the second, resulting in `0`.

// If we changed the `var a` declaration to `let` instead, the first call would retunr `NaN` as their is no `a` property defined on the global object.

// 6

// We can use `call` or `apply` to set the execution context eplicitly.

// 7

// bar.add.call(foo); // 3

// 8

let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList() {
  console.log(this.title + ':');

  let args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}

// invoke outputList here

outputList.apply(fruitsObj, fruitsObj.list);

// OR

outputList.call(fruitsObj, ...fruitsObj.list);

// 9

// It isn't possible to call forEach on arguments since it is only Array-like and not an array. However, since it is Array-like (having indices from 0 to length - 1) we can use it as the context to a slice method call on an empty array. The return value assigned to args is an array holding all of the arguments passed to the outputList function since we are executing slice with no arguments passed to it (recall: the first value passed to call is the execution context).

// Modern JavaScript doesn't use the built-in arguments object. Instead, it uses the new rest syntax that we discuss in our Syntactic Sugar gist:
/*

let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList(...args) {
  console.log(this.title + ':');

  args.forEach(function(elem) {
    console.log(elem);
  });
}
*/
// invoke outputList here