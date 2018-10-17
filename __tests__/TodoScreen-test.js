import React from 'react';
import AddTask from '../components/AddTask.js';
import TodoScreen from '../screens/TodoScreen.js';
import ScrollView from 'react-native';

//Ettersom TodoScreen er avhengig av komponentene i den, kan vi ikkje
//bare ta en snapshot. Ved hjelp av shallow rendering kan vi teste
//komponenter som er avhengig av subkomponenter.
//tester bare 1 level

import ShallowRenderer from 'react-test-renderer/shallow'
import renderer from 'react-test-renderer';

let rend;
let result;

beforeAll(() => {
  rend = new ShallowRenderer();
  rend.render(<TodoScreen/>);
  result = rend.getRenderOutput();
  console.log(result.props.children[0]);
});

test("Shallow render test of Todoscreen",() =>{
  expect(result.ref).toBe(null);
});
