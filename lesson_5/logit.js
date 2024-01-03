//CommonJS Modules

let prefix = ">> ";

function logIt(string) {
  console.log(`${prefix}${string}`);
}

function setPrefix(newPrefix) {
  prefix = newPrefix;
}

// module.exports = logIt; // single value export.

module.exports = {
  logIt,
  setPrefix,
} // multi value export.