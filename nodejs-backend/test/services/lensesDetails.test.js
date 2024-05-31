const assert = require('assert');
const app = require('../../src/app');

describe('\'lensesDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('lensesDetails');

    assert.ok(service, 'Registered the service (lensesDetails)');
  });
});
