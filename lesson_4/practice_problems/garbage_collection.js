// Garbage Collecton

// 1

// Yes it is. This means that we don't need to specifically allocate space and remove element from memory. The JS runtime, rather than the developer, will handle removing any objects stored in memeory once they are no longer referenced by any variable in the program.

// JavaScript is a garbage-collected language. This means that the JS runtime, rather than the developer, handles memory deallocation.

// 2

// Line 5: Nothing elegible for GC

// Line 10: Only myArr is eletigile for GC.

// 3

// No, because of the closure created by `makeGreeting`.

// 4

// Only once the program ends.