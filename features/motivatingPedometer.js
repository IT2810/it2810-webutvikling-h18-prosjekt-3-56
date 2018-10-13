import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Pedometer} from 'expo';
import { ProgressCircle }  from 'react-native-svg-charts'
import {Foundation} from '@expo/vector-icons';

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
				<View style={styles.circleContainer}> 
					<ProgressCircle
					style={ { height: 200 } }
					progress={ 0.7 }
					progressColor={'rgb(134, 65, 244)'}
					/> 
				</View>
				<View style={styles.overlapper}>
					<View style={styles.inner}>
						<Foundation name = 'foot' />
					</View>
					<View style={styles.inner}>
						<Text>Steps so far: {this.state.currentStepCount}</Text>
					</View>
				</View>
			</View>
		);
	};
};
	
const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "black",
		justifyContent: "center"
	},
	circleContainer: {
		marginHorizontal: 20,
		borderWidth: 1,
		borderColor: "black"
	},
	overlapper: {
		borderWidth: 1,
		borderColor: "black",
		flexDirection: "row",
		justifyContent: "center",
		position: "absolute",
		zIndex: 1,
		width: "100%"
	},
	inner: {
		marginHorizontal: 8,
		borderWidth: 1,
		borderColor: "black",
		height: 75,
		width: 75
	}
});