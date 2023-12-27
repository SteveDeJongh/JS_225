// Functions as object factories

// 1

// The method getDescription is repeated in the same form in each object. However, each object needs to hold unique values for its name and continent properties.

// 2

// function makeCountry(name, continent) {
//   return {
//     name,
//     continent,
//     getDescription() {
//       return this.name + ' is located in ' + this.continent + '.';
//     },
//   };
// }

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

console.log(chile.getDescription());       // "The Republic of Chile is located in South America."
console.log(canada.getDescription());      // "Canada is located in North America."
console.log(southAfrica.getDescription()); // "The Republic of South Africa is located in Africa."

// 3

// function makeCountry(name, continent) {
//   return {
//     name,
//     continent,
//     visited: false,
//     getDescription() {
//       return this.name + ' is located in ' + this.continent + '.';
//     },
//   };
// }

// 4

// function makeCountry(name, continent, visited = false) {
//   return {
//     name,
//     continent,
//     visited,
//     getDescription() {
//       return this.name + ' is located in ' + this.continent + '.';
//     },
//   };
// }

// 5

// function makeCountry(name, continent, visited = false) {
//   return {
//     name,
//     continent,
//     visited,
//     getDescription() {
//       return this.name + ' is located in ' + this.continent + '.';
//     },
//     visitCountry() {
//       this.visited = true;
//     }
//   };
// }

// 6

function makeCountry(name, continent, visited = false) {
  return {
    name,
    continent,
    visited,
    getDescription() {
      return this.name + ' is located in ' + this.continent + '.' +
      ` I ${this.visited ? 'have ' : "haven't "}` + this.name + '.';
    },
    visitCountry() {
      this.visited = true;
    }
  };
}

console.log(canada.getDescription()); // "Canada is located in North America. I haven't visited Canada."
canada.visitCountry();
console.log(canada.getDescription()); // "Canada is located in North America. I have visited Canada."