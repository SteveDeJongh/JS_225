// Anonymizer
/*
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let Account = (function() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function isValidPassword(testPassword) {
    return userPassword === testPassword;
  }

  function anonymize() {
    let chars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f'];

    return shuffle(chars).join('');
  }
  
  return {
    init: function(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    reanonymize(pass) {
      if (isValidPassword(pass)) {
        this.displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword(oldPass, newPass) {
      if (isValidPassword(oldPass)) {
        userPassword = newPass;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName(pass) {
      if (isValidPassword(pass)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName(pass) {
      if (isValidPassword(pass)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email(pass) {
      if (isValidPassword(pass)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },
  }
})();
*/

// let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// // console.log(fooBar);
// // console.log(fooBar.displayName);

// console.log(fooBar.firstName);                     // returns the firstName function
// console.log(fooBar.email);                         // returns the email function
// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence
// console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
// console.log(fooBar.resetPassword('123456', 'abc')) // logs true

// let displayName = fooBar.displayName;
// fooBar.reanonymize('abc');                         // returns true
// console.log(displayName === fooBar.displayName);   // logs false

// FE, With two instances this solution fails as they share the same copies of the variables within the closure.

// FE Solution

// Stores `Accounts` in teh `accounts` object with their display name as keys.

let Account = function() {
  let accounts = {};

  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    .split('');

  function makeDisplayName() {
    let result;

    do {
      result = '';
      for (let idx = 0; idx < 16; idx += 1) {
        let rand = Math.floor(Math.random() * CHARACTERS.length);
        result += CHARACTERS[rand];
      }
    } while (result in accounts);

    return result;
  }

  return {
    init(email, password, firstName, lastName) {
      this.displayName = makeDisplayName();
      accounts[this.displayName] = { email, password, firstName, lastName };
      return this;
    },

    reanonymize(password) {
      const account = accounts[this.displayName];
      if (password !== account.password) return 'Invalid Password';

      delete account[this.displayName];
      this.displayName = makeDisplayName();
      accounts[this.displayName] = account;
      return true;
    },

    resetPassword(password, newPassword) {
      const account = accounts[this.displayName];
      if (password !== account.password) return 'Invalid Password';

      account.password = newPassword;
      return true;
    },

    firstName(password) {
      const account = accounts[this.displayName];
      if (password !== account.password) return 'Invalid Password';

      return account.firstName;
    },

    lastName(password) {
      const account = accounts[this.displayName];
      if (password !== account.password) return 'Invalid Password';

      return account.lastName;
    },

    email(password) {
      const account = accounts[this.displayName];
      if (password !== account.password) return 'Invalid Password';

      return account.email;
    },
  };
}();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'foo'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'