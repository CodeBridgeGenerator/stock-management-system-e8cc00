const assert = require('assert');
const app = require('../../src/app');

describe('\'lens\' service', () => {
  it('registered the service', () => {
    const service = app.service('lens');

    assert.ok(service, 'Registered the service (lens)');
  });
});
