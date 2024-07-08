import { parsePadding, findNode, findChildCount } from './utils';

test('should set all sides to input number, when a number is provided', () => {
  const expectedPadding = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  expect(parsePadding(10)).toEqual(expectedPadding);
});

test('should set horizontal and vertical padding, when an array with numbers is provided', () => {
  const expectedPadding = {
    top: 20,
    right: 50,
    bottom: 20,
    left: 50
  };
  expect(parsePadding([20, 50])).toEqual(expectedPadding);
});

test('should set each padding value individually, when an array with four numbers is provided', () => {
  const expectedPadding = {
    top: 20,
    right: 50,
    bottom: 100,
    left: 150
  };
  expect(parsePadding([20, 50, 100, 150])).toEqual(expectedPadding);
});

test('should find a node by id', () => {
  const layout = [
    {
      x: 0,
      y: 0,
      id: '1',
      children: [{ x: 0, y: 0, id: '1', children: [] }]
    },
    {
      x: 0,
      y: 0,
      id: '3',
      children: [{ x: 0, y: 0, id: '4', children: [] }]
    }
  ];
  const node = findNode(layout, '4');

  expect(node).toEqual({ x: 0, y: 0, id: '4', children: [] });
});

test('should find the number of children a node has', () => {
  const node = {
    x: 0,
    y: 0,
    id: '1',
    children: [
      { x: 0, y: 0, id: '1', children: [] },
      { x: 0, y: 0, id: '2', children: [{ x: 0, y: 0, id: '3', children: [] }] }
    ]
  };
  const count = findChildCount(node);

  expect(count).toEqual(3);
});
