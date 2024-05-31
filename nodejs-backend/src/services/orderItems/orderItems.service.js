const { OrderItems } = require('./orderItems.class');
const createModel = require('../../models/orderItems.model');
const hooks = require('./orderItems.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/orderItems', new OrderItems(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('orderItems');

  service.hooks(hooks);
};