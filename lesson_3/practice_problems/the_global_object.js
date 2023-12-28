// The Global Object

// 1

// The global object. `global` in Node, and `window` in chrome.

// 2 

// true

// 3

// line 3 will raise an error. 

// 4 

// It raises an error on line 7 as `b` is not defined as a property on the global object and isn't accessible outside the function.

// 5

// Logs 1
// This is because `b` is assigned as property on the global object as var/let/const are not used in it's declaration.

// 6

// This will raise an error, as `b = 1` will raise a reference error. As we're using strict mode, we don't have access to the global object.