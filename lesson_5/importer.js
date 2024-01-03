// CommonJS Modules

// const logIt = require("./logit"); // Single value reference.

// logIt("You rock!"); // Single value refrence;

const {logIt, setPrefix} = require("./logit"); // Multiple value reference using object destructuring.

logIt("You rock!");
setPrefix("++ ");
logIt("Your rock!");

console.log(module);