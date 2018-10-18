import {removeItem} from '../util/util.js';
list = [{"id":0}, {"id":1}, {"id":2}, {"id":3}];


test("removeItem function works", () => {
  expect(removeItem(0,list)).toEqual([{"id":1}, {"id":2}, {"id":3}]);
  expect(removeItem(0,list)).toEqual([{"id":1}, {"id":2}, {"id":3}]);
  expect(removeItem(2.5,list)).toEqual([{"id":1}, {"id":2}, {"id":3}]);
});
