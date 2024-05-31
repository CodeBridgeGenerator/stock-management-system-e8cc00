const { InventoryTransactions } = require('./inventoryTransactions.class');
const createModel = require('../../models/inventoryTransactions.model');
const hooks = require('./inventoryTransactions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/inventoryTransactions', new InventoryTransactions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inventoryTransactions');

  service.hooks(hooks);
};