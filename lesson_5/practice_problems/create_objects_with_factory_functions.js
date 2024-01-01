// Create Objects with Factory Functions

// 1

// A) All created objects will have the same copies of the full list methods available.
// B) There isn't a way to inspect an objet and know if it was created from an object factory.

// 2

function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}

// 3

// function createInvoice(services = {}) {
//   return {
//     phone: services.phone || 3000,
//     internet: services.internet || 5500,
//     total() {
//       return this.phone + this.internet;
//     }
//   }
// }

// function invoiceTotal(invoices) {
//   let total = 0;
//   let i;

//   for (i = 0; i < invoices.length; i += 1) {
//     total += invoices[i].total();
//   }

//   return total;
// }

// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({
//   internet: 6500,
// }));

// invoices.push(createInvoice({
//   phone: 2000,
// }));

// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));

// console.log(invoiceTotal(invoices));             // => 31000

// 4

// function createPayment(services = {}) {
//   let payment = {};
//   Object.keys(services).forEach(key => {
//     payment[key] = services[key];
//   })

//   payment.total = function() {
//     if (this.amount) {
//       return this.amount;
//     }
//     return (this.phone || 0) + (this.internet || 0);
//   }

//   return payment;
// }

// Alternatively:

function createPayment(services) {
  services = services || {};
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total: function() {
      return this.amount || (this.phone + this.internet);
    },
  };
}

function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

// let payments = [];
// payments.push(createPayment());
// payments.push(createPayment({
//   internet: 6500,
// }));

// payments.push(createPayment({
//   phone: 2000,
// }));

// payments.push(createPayment({
//   phone: 1000,
//   internet: 4500,
// }));

// payments.push(createPayment({
//   amount: 10000,
// }));

// console.log(paymentTotal(payments));      // => 24000

// 5

function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(inc) {
      this.payments.push(inc);
    },

    addPayments(batch) {
      batch.forEach(p => this.payments.push(p));
    },

    paymentTotal() {
      let total = 0;

      this.payments.forEach(payment => {
        total += payment.total();
      });

      return total;
    },

    amountDue() {
      return this.total() - this.paymentTotal();
    }
  }
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0

// LS Solution

// function createInvoice(services) {
//   services = services || {};
//   return {
//     phone: services.phone || 3000,
//     internet: services.internet || 5500,
//     payments: [],

//     total: function() {
//       return this.phone + this.internet;
//     },

//     addPayment: function(payment) {
//       this.payments.push(payment);
//     },

//     addPayments: function(payments) {
//       let i;

//       for (i = 0; i < payments.length; i += 1) {
//         this.addPayment(payments[i]);
//       }
//     },

//     paymentTotal: function() {
//       let totalPaid = 0;
//       let i;

//       for (i = 0; i < this.payments.length; i += 1) {
//         totalPaid += this.payments[i].total();
//       };

//       return totalPaid;
//     },

//     amountDue: function() {
//       return this.total() - this.paymentTotal();
//     },
//   };
// }