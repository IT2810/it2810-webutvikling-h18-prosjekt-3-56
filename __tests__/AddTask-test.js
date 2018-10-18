import React from 'react';
import AddTask from '../components/AddTask.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<AddTask/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
