// Lesson 2: Practice Problems: Objects

// 1

let invoices = {
  unpaid: [],
};

// 2

// invoices.add = function(clientName, amountOwing) {
//   let invoice = {
//     name: clientName,
//     amount: amountOwing,
//   }

//   this.unpaid.push(invoice);
// }

// Alt

invoices.add = function(name, amount) {
  this.unpaid.push({
    name,
    amount,
  });
};

// console.log(invoices);

// 3

invoices.totalDue = function() {
  let sum = 0;
  this.unpaid.forEach(x => {
    sum += x.amount;
  });

  return sum;
}

// console.log(invoices.totalDue())

// 4

invoices.add('Due North Development',	250);
invoices.add('Moonbeam Interactive',	187.50);
invoices.add('Slough Digital',	300);

console.log(invoices)
console.log(invoices.totalDue())

// 5

invoices.paid = [];

invoices.payInvoice = function(name) {
  let toBePaid = [];
  this.unpaid.forEach(invoice => {
    if (invoice.name === name) {
      this.paid.push(invoice);
    } else {
      toBePaid.push(invoice);
    }
  });

  this.unpaid = toBePaid;
}

console.log(invoices);

// 6

invoices.totalPaid = function() {
  let total = 0;
  this.paid.forEach(invoice => {
    total += invoice.amount;
  });

  return total;
}

// 7

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');

console.log(invoices.totalDue());
console.log(invoices.totalPaid());