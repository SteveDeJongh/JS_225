// Mini Inventory Management System

const ItemCreator = (function() {
  function isValidInfo(name, cat, stock) {
    if (name.match(/[A-Z]/gi).length < 5) return false;
    if (cat.includes(' ') || cat.length < 5) return false;
    if (stock === undefined) return false;
    return true;
  }

  function makeSku(name, cat) {
    let first3 = name.match(/[A-Z]/gi).slice(0, 3).join('').toUpperCase();
    let first2 = cat.match(/[A-Z]/gi).slice(0, 2).join('').toUpperCase();
    return first3 + first2;
  }

  return function(itemName, category, q) {
    if (isValidInfo(itemName, category, q)) {
      this.sku = makeSku(itemName, category);
      this.name = itemName;
      this.category = category;
      this.q = q;
    } else {
      return {notValid: true};    
    }
  }
})();

const ItemManager = {
  items: [],

  create(itemName, category, stock) {
    const item = new ItemCreator(itemName, category, stock)
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
    };
  },

  update(sku, updates) {
    let item = this.items.filter(item => item.sku === sku)[0];
    Object.keys(updates).forEach(k => {
      item[k] = updates[k];
    });
  },

  delete(sku) {
     this.items = this.items.filter(item => item.sku !== sku);
  },

  inStock() {
    this.items.forEach(item => {
      if (item.q > 0) {
        console.log(item);
      }
    })
  },

  itemsInCategory(cat) {
    this.items.forEach(item => {
      if (item.category === cat) {
        console.log(item);
      }
    })
  },
};

let ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  reportInStock() {
    let result = [];
    this.items.items.filter(item => {
      if (item.q > 0) {
        result.push(item.name);
      }
    });
    console.log(result.join(','));
  },

  createReporter(sku) {
    let info = this.items.items.filter(item => item.sku === sku)[0];
    return {
      itemInfo() {
        Object.keys(info).forEach(key => {
          console.log(`${key}: ${info[key]}`);
        });
      },
    }
  },
}

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { q: 0 });
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { q: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10