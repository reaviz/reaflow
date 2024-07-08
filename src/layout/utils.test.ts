import { parsePadding, findNode, getChildCount, calculateZoom, calculateScrollPosition } from './utils';

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

test('should get the number of children a node has', () => {
  const node = {
    x: 0,
    y: 0,
    id: '1',
    children: [
      { x: 0, y: 0, id: '1', children: [] },
      { x: 0, y: 0, id: '2', children: [{ x: 0, y: 0, id: '3', children: [] }] }
    ]
  };
  const count = getChildCount(node);

  expect(count).toEqual(3);
});

test('should calculate the zoom for a node', () => {
  const node = { width: 100, height: 100, x: 0, y: 0, id: '1' };
  const zoom = calculateZoom({ node, viewportWidth: 1000, viewportHeight: 1000, minViewportCoverage: 0.2, maxViewportCoverage: 0.9 });

  expect(zoom).toEqual(1);
});

test('should calculate the zoom for a node with many children', () => {
  const node = { width: 100, height: 100, x: 0, y: 0, id: '0', children: [{ x: 0, y: 0, id: '1', children: [{ x: 0, y: 0, id: '2', children: [{ x: 0, y: 0, id: '3', children: [] }] }] }] };
  const zoom = calculateZoom({ node, viewportWidth: 1000, viewportHeight: 1000, minViewportCoverage: 0.2, maxViewportCoverage: 0.9 });

  expect(zoom).toEqual(4);
});

test('should calculate the scroll position for a node', () => {
  const node = { width: 100, height: 100, x: 0, y: 0, id: '0' };
  const scrollPosition = calculateScrollPosition({ node, viewportWidth: 1000, viewportHeight: 1000, canvasWidth: 2000, canvasHeight: 2000, chartWidth: 500, chartHeight: 500, zoom: 1 });

  expect(scrollPosition).toEqual([300, 300]);
});
