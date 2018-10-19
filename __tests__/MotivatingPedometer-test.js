import React from 'react';
import Pedometer from '../features/MotivatingPedometer.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import {ProgressCircle }  from 'react-native-svg-charts';


it("renders progressCircle correct", () => {
	const tree = renderer
	.create(
		<ProgressCircle 
			style = {{height: 350}}
			progress = {0.7 / 1}
			progressColor = {'black'}
		/>
	)
	.toJSON();
	expect(tree).toMatchSnapshot();
})

it("renders correctly", () => {
	const tree = renderer.create(<Pedometer />).toJSON();
	expect(tree).toMatchSnapshot();
})