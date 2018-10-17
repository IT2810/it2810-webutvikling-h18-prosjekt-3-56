import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Pedometer} from 'expo';
import { ProgressCircle }  from 'react-native-svg-charts'
import {Foundation} from '@expo/vector-icons';

export default class motivatingPedometer extends Component{

	state = {
		stepGoal: 1000,
		isPedometerAvailable: "checking",
		pastStepCount: 0,
		currentStepCount: 100,
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
		Pedometer.isAvailableAsync().then(
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
		); /*
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
		); */
	}; 
	
	_unsubscribe = () => {
		this._subscription && this._subscription.remove();
		this._subscription = null;
	}

	validateInput = text => {
		isNaN(text) ? Alert.alert("Error", "Please type a number") : this.setState({stepGoal: text})
	};
	
	render(){
		console.log(this.state.stepGoal);
		return (
			<View style={styles.container}>
				<View style={styles.circleContainer}> 
					<ProgressCircle
					style = {styles.progressCircle}
					progress={ this.state.currentStepCount / this.state.stepGoal }
					progressColor={'rgb(241, 196, 15)'}
					/> 
				</View>
				<View style={styles.overlapper}>
					<View style={styles.innerLeft}>
						<Foundation name = 'foot' size = {100} />
						<Foundation name = 'foot' size = {100} style = {styles.rightFoot}/>
					</View>
					<View style={styles.innerRight}>
						<Text style = {styles.rightContent}>   {this.state.currentStepCount + " /"}</Text>
						<TextInput
						style={styles.rightContent}
						placeholder= "1000"
						onSubmitEditing={(event) => this.validateInput(event.nativeEvent.text)}
						/>
					</View>
				</View>
			</View>
		);
	};
};
	
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: "3%",
		justifyContent: "center",
	},
	circleContainer: {
		height: '100%',
		width: '94%',
		marginHorizontal: '3%',
	},
	progressCircle: {
		height: '100%'
	},
	overlapper: {
		flexDirection: "row",
		justifyContent: "center",
		position: "absolute",
		zIndex: 1,
		width: "100%",
		height: "72%",
	},
	innerRight: {
		marginTop: "35%",
		height: "40%",
		width: "35%",
	},
	innerLeft: {
		marginTop: "5%",
		flexDirection: "row",
		height: '55%',
		width: '32%',
		justifyContent: "center",
	},
	rightContent: {
		fontSize: 35,
		fontWeight: "400",
	}, 
	rightFoot: {
		marginLeft: 10,
		marginTop:40,
		transform: [{scaleX: -1}]
	}
});