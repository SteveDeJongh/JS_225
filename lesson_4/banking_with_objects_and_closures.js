// Project: Banking with Objects and Closures

/*
// 1

function makeAccount(number) {
  return {
    number,
    balance: 0,
    transactions: [],
    
    deposit(amount) {
      this.transactions.push({type: "deposit", amount});

      this.balance += amount;
      return amount;
    },

    withdraw(amount) {
      if (amount > this.balance) {
        amount = this.balance;
      }

      this.transactions.push({type: "withdraw", amount});
      this.balance -= amount;
      return amount;
    },
  }
}

// 2
console.log(account.balance);
// 0
console.log(account.deposit(12));
// 12
console.log(account.balance);
// 12
console.log(account.deposit(10));
// 10
console.log(account.balance);
// 22

// 3
account.deposit(78);
console.log(account.balance);
// 100
console.log(account.withdraw(19));
// 19
console.log(account.balance);
// 81

console.log(account.balance);
// 81
console.log(account.withdraw(91));
// 81
console.log(account.balance);
// 0

// 4
console.log(account.deposit(23));
// 23
console.log(account.transactions);
// [{...}]
console.log(account.transactions[0]);
// {type: "deposit", amount: 23}


// 5
let account = makeAccount();
console.log(account.deposit(15));
// 15
console.log(account.balance);
// 15
let otherAccount = makeAccount();
console.log(otherAccount.balance);
// 0

// 6
function makeBank() {
  return {
    accounts: [],
  }
}

let bank = makeBank();
console.log(bank.accounts);
// []

// 7
function makeBank() {
  return {
    accounts: [],
    openAccount() {
      let number = this.accounts.length + 101;
      let newAccount = makeAccount(number);
      this.accounts.push(newAccount);
      return newAccount;
    },
  }
}

let bank = makeBank();
let account = bank.openAccount();
console.log(account.number);
// 101
console.log(bank.accounts);
// [{...}]
console.log(bank.accounts[0]);
// {
//  number: 101,
//  balance: 0,
//  transactions: [],
//  deposit: [Function: deposit],
//  withdraw: [Function: withdraw]
// }
let secondAccount = bank.openAccount();
console.log(secondAccount.number);
// 102

// 8

function makeBank() {
  return {
    accounts: [],
    openAccount() {
      let number = this.accounts.length + 101;
      let newAccount = makeAccount(number);
      this.accounts.push(newAccount);
      return newAccount;
    },

    transfer(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    }
  }
}

let bank = makeBank();
let source = bank.openAccount();
console.log(source.deposit(10));
// 10
let destination = bank.openAccount();
console.log(bank.transfer(source, destination, 7));
// 7
console.log(source.balance);
// 3
console.log(destination.balance);
// 7

*/
// 9
function makeBank() {
  let accounts = [];

  function makeAccount(number) {
    let balance = 0;
    let transactions = [];
    return {    
      deposit(amount) {
        transactions.push({type: "deposit", amount});
  
        balance += amount;
        return amount;
      },
  
      withdraw(amount) {
        if (amount > balance) {
          amount = balance;
        }
  
        transactions.push({type: "withdraw", amount});
        balance -= amount;
        return amount;
      },
  
      balance() {
        return balance;
      },
  
      number() {
        return number;
      },
  
      transactions() {
        return transactions;
      },
    }
  }

  return {
    openAccount() {
      let number = accounts.length + 101;
      let newAccount = makeAccount(number);
      accounts.push(newAccount);
      return newAccount;
    },

    transfer(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    }
  }
}

let bank = makeBank();
let account = bank.openAccount();
console.log(account.balance());
// 0
console.log(account.deposit(17));
// 17
let secondAccount = bank.openAccount();
console.log(secondAccount.number());
// 102
console.log(account.transactions());
// [{...}]

// 10

// let bank = makeBank();
console.log(bank.accounts);
// undefined