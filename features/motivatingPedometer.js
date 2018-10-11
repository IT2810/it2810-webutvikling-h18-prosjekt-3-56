import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Pedometer} from 'expo';
import { ProgressCircle }  from 'react-native-svg-charts'

export default class motivatingPedometer extends Component{
	/* Denne komponenten setter sammen statusbar, foot-icon,
	implementer aksess til accelerometer og styler det */
	state = {
		isPedometerAvailable: "checking",
		pastStepCount: 0,
		currentStepCount: 0
	};

	componentDidMount() {
		this._subscribe();
	};
	
	componentWillUnmount() {
		this._unsubscribe();
	};

	_subscribe = () => {
		this._subscription = Pedometer.watchStepCount(result => {
			this.setState({
				currentStepCount: result.steps
			});
		});
		/*Pedometer.isAvailableAsync().then(
			result => {
				this.setState({
					isPedometerAvailable: String(result)
				});
			},
			error => {
				this.setState({
					isPedometerAvailable: "Could not get isPedometerAvailable: " + error
				});
			}
		);
	
		const end = new Date();
		const start = new Date();
		start.setDate(end.getDate() - 1);
		Pedometer.getStepCountAsync(start, end).then(
			result => {
				this.setState({ pastStepCount: result.steps });
			},
			error => {
				this.setState({
					 pastStepCount: "Could not get stepCount: " + error
				});
			}
		);*/
	}; 
	
	_unsubscribe = () => {
		this._subscription && this._subscription.remove();
		this._subscription = null;
	}
	
	render(){
		return (
			<View style={styles.container}>
				<Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
				<ProgressCircle
					style={ { height: 200 } }
					progress={ 0.7 }
					progressColor={'rgb(134, 65, 244)'}
				/>
		  </View>
		);
	};
};
	
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 15,
		alignItems: "center",
		justifyContent: "center"
	}
});

/*		    <Text>
			 Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
		    </Text>
		    <Text>
			 Steps taken in the last 24 hours: {this.state.pastStepCount}
		    </Text>*/