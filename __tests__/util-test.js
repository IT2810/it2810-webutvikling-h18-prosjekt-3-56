import {removeItem, isPostitveInteger} from '../util/util.js';
list = [{"id":0}, {"id":1}, {"id":2}, {"id":3}];


test("removeItem function works", () => {
  expect(removeItem(0,list)).toEqual([{"id":1}, {"id":2}, {"id":3}]);
  expect(removeItem(0,list)).toEqual([{"id":1}, {"id":2}, {"id":3}]);
  expect(removeItem(2.5,list)).toEqual([{"id":1}, {"id":2}, {"id":3}]);
});

test('validation function works', () => {
  expect(isPostitveInteger(0)).toBe(true);
  expect(isPostitveInteger(-1)).toBe(false);
  expect(isPostitveInteger(1.7)).toBe(false);
  expect(isPostitveInteger(1000)).toBe(true);
  expect(isPostitveInteger('100')).toBe(true);
  expect(isPostitveInteger('-145')).toBe(false);
  expect(isPostitveInteger('0')).toBe(true);
  expect(isPostitveInteger('kjfdsdf')).toBe(true);
  expect(isPostitveInteger('1.89')).toBe(true);
  expect(isPostitveInteger('18*46 - 12')).toBe(false);
})
