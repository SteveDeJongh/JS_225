// Don't pollute My Window

// const name = 'Naveed';
// const greeting = 'Hello';

// const greeter = {
//   message: `${greeting} ${name}!`,
//   sayGreetings() {
//     console.log(this.message);
//   }
// };

// Polutes teh global scope.

// Doesn't polute the global scope:

// const greeter = {
//   name: 'Naveed',
//   greeting: 'Hello',
//   sayGreetings() {
//     let message = `${this.greeting} ${this.name}!`;
//     console.log(message);
//   }
// };

// greeter.sayGreetings();

// Or

const greeter = {
  message: (() => {
    const name = 'Naveed';
    const greeting = 'Hello';

    return `${greeting} ${name}!`;
  })(),

  sayGreetings() {
    console.log(this.message);
  }
};