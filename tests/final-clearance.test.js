const assert = require('node:assert/strict');
const test = require('node:test');

const { openReturn } = require('../src/returns');

test('refuses an order containing only final-clearance lines', () => {
  const order = { id: 'order-141' };
  const lines = [{ id: 'line-1', finalClearance: true }];

  assert.throws(() => openReturn(order, lines), /final-clearance/);
});

test('keeps only normal lines from a mixed order', () => {
  const order = { id: 'order-142' };
  const normalLine = { id: 'line-2', finalClearance: false };
  const lines = [
    { id: 'line-1', finalClearance: true },
    normalLine,
  ];

  assert.deepEqual(openReturn(order, lines).lines, [normalLine]);
});

test('keeps all lines when none are final clearance', () => {
  const order = { id: 'order-143' };
  const lines = [
    { id: 'line-1', finalClearance: false },
    { id: 'line-2', finalClearance: false },
  ];

  assert.deepEqual(openReturn(order, lines).lines, lines);
});
