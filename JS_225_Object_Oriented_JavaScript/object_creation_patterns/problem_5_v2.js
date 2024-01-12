// Mini Inventory Management System V2

const ItemCreator = (function() {
  function isValidName(itemName) {
    return itemName.replace(/\s/g, "").length >= 5;
  };

  function isValidCategory(category) {
    return category.replace(/\s/g, '').length >= 5 && category.split(' ').length === 1;

  };

  function isValidQuantity(quantity) {
    return quantity !== undefined;
  };

  function makeSku(itemName, category) {
    return (itemName.replace(/\s/g, '').slice(0,3).toUpperCase() +
            category.replace(/\s/g, '').slice(0,2).toUpperCase());
  };

  return function(itemName, category, quantity) {
    if (isValidName(itemName) && isValidCategory(category) && isValidQuantity(quantity)) {
        this.name = itemName;
        this.sku = makeSku(itemName, category);
        this.category = category;
        this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  };
})();

const ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    let item = new ItemCreator(itemName, category, quantity);

    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
    };
  },

  update(sku, updates) {
    let itemToUpdate = this.items.find(obj => obj.sku === sku);

    Object.keys(updates).forEach(k => {
      itemToUpdate[k] = updates[k];
    })
  },

  delete(sku) {
    let idx = this.items.findIndex(obj => obj.sku === sku);

    this.items.splice(idx, 1);
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },

  itemsInCategory(cat) {
    return this.items.filter(item => item.category === cat);
  },
}

const ReportManager = {
  init(ItemManager) {
    this.items = ItemManager;
  },

  createReporter(sku) {
    let item = this.items.items.find(item => item.sku === sku);
    return {
      itemInfo() {
        Object.keys(item).forEach(k =>{
          console.log(k + ": " + item[k]);
        })
      },
    }
  },

  reportInStock() {
    console.log(this.items.inStock().map(obj => obj.name).join(','));
  }
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

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
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

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10