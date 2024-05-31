const { Lens } = require('./lens.class');
const createModel = require('../../models/lens.model');
const hooks = require('./lens.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/lens', new Lens(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lens');

  service.hooks(hooks);
};