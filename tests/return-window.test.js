const assert = require('node:assert/strict');
const test = require('node:test');

const { openReturn } = require('../src/returns');

const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = Date.parse('2026-09-12T12:00:00.000Z');
const lines = [{ id: 'line-1', finalClearance: false }];

test('refuses a return on day 31', (t) => {
  t.mock.method(Date, 'now', () => NOW);
  const order = {
    id: 'order-152',
    deliveredAt: new Date(NOW - 31 * DAY_MS).toISOString(),
  };

  assert.throws(() => openReturn(order, lines), /30-day return window/);
});

test('allows a return on day 30 exactly', (t) => {
  t.mock.method(Date, 'now', () => NOW);
  const order = {
    id: 'order-153',
    deliveredAt: new Date(NOW - 30 * DAY_MS).toISOString(),
  };

  assert.deepEqual(openReturn(order, lines).lines, lines);
});

test('allows an order that has not been delivered', (t) => {
  t.mock.method(Date, 'now', () => NOW);

  assert.deepEqual(openReturn({ id: 'order-154' }, lines).lines, lines);
});
