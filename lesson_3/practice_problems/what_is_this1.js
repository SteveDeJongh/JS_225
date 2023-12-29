// What is this? (1)

// 1

// the context of this is only determined at execution time, as the function is not invoked, we don't know here.

// 2

// Function calls set the execution context ot he implciit global object, or global context for short. When we use the global object implciitly to call a function, we call it with the global context.

// In this example, running in chrome, the context is window.

// 3

// Window, as we are calling `baz` with the implicit global context.

// 4

// `this` points to `obj`.

// 5

// This raises an error. Since the function is called without an explicit object, this inside `foo` resolves to the global execution context, which is `undefiend` in strict mode. The code raises an error because we're trying to access the nonexisting `a` property of `undefined`.

// 6

// This will log `2` to the console. 

// 7

// logs `foo`
// then raises an error

// Executing from line 12 sets this in bar to the foo object (via implicit method execution context). From the body of the bar method, it then calls foo's baz method. baz returns foo since it has foo's context (again via implicit method execution context; this === foo following the execution from line 12), which causes line 4 to log foo.

// Line 14 calls bar as a function in the global context, window; since baz doesn't exist in window, JavaScript raises an error.