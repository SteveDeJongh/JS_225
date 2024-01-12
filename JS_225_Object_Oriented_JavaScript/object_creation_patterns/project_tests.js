var $ol = document.querySelector("ol");

function outputResult(message) {
  var $li = document.createElement("li");
  $li.innerText = message;
  $ol.appendChild($li);
  return $li;
}

function test(message, assertion) {
  var $msg = outputResult(message),
      passed = false;

  try {
    passed = assertion();
  }
  catch (e) {
    passed = false;
  }
  $msg.setAttribute("class", passed ? "pass" : "fail");
}

// test("_ is defined", function() {
//   return typeof _ !== "undefined";
// });

test("ItemManager has a create function defined", function() {
    return typeof ItemManager.create === 'function';
});

(function() {
  ItemManager.create('basket ball', 'sports', 0);
  ItemManager.create('asd', 'sports', 0);
  ItemManager.create('football', 'sports');
  ItemManager.create('kitchen pot', 'cooking items', 0);

  test("create only adds valid items", function() {
  return ItemManager.items.length === 1 && ItemManager.items[0].sku === 'BASSP';
  })
})();

test("IteamCreator's makeSku method is private", function() {
  return typeof makeSku === 'undefined' && typeof ItemCreator.makeSku === 'undefined';
});

(function() {
  ItemManager.create('First', 'Category', 10);
  ItemManager.create('Se cond', 'Category', 10);
  test('makeSku handles short first word correctly', function() {
    return ItemManager.items[1].sku === 'FIRCA' && ItemManager.items[2].sku === 'SECCA';
  })
})();

