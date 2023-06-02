import { parsePadding } from './utils';

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
