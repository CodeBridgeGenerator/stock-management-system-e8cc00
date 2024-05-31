const assert = require('assert');
const app = require('../../src/app');

describe('\'inventoryTransactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('inventoryTransactions');

    assert.ok(service, 'Registered the service (inventoryTransactions)');
  });
});
