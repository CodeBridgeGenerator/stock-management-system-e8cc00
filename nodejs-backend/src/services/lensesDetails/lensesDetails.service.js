const { LensesDetails } = require('./lensesDetails.class');
const createModel = require('../../models/lensesDetails.model');
const hooks = require('./lensesDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/lensesDetails', new LensesDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lensesDetails');

  service.hooks(hooks);
};