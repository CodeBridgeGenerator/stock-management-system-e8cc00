const users = require("./users/users.service.js");
const lens = require("./lens/lens.service.js");
const brands = require("./brands/brands.service.js");
const categories = require("./categories/categories.service.js");
const lensesDetails = require("./lensesDetails/lensesDetails.service.js");
const customers = require("./customers/customers.service.js");
const orders = require("./orders/orders.service.js");
const orderItems = require("./orderItems/orderItems.service.js");
const inventoryTransactions = require("./inventoryTransactions/inventoryTransactions.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(lens);
  app.configure(brands);
  app.configure(categories);
  app.configure(lensesDetails);
  app.configure(customers);
  app.configure(orders);
  app.configure(orderItems);
  app.configure(inventoryTransactions);
    // ~cb-add-configure-service-name~
};
