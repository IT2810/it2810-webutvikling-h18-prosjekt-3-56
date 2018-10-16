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
		); 
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
					style={ { height: 350 } }
					progress={ this.state.currentStepCount / this.state.stepGoal }
					progressColor={'rgb(241, 196, 15)'}
					/> 
				</View>
				<View style={styles.overlapper}>
					<View style={styles.innerLeft}>
						<Foundation name = 'foot' size = {110} />
						<Foundation name = 'foot' size = {110} style = {styles.rightFoot}/>
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
		marginTop: 20,
		justifyContent: "center"
	},
	circleContainer: {
		marginHorizontal: 20,
	},
	overlapper: {
		flexDirection: "row",
		justifyContent: "center",
		position: "absolute",
		zIndex: 1,
		width: "100%"
	},
	innerRight: {
		marginTop: 100,
		height: 130,
		width: 130,
		justifyContent:  "center",
	},
	innerLeft: {
		marginBottom: 100,
		flexDirection: "row",
		height: 150,
		width: 140,
		alignItems: "center",
		justifyContent:  "center"
	},
	rightContent: {
		fontSize: 40,
		fontWeight: "400"
	}, 
	rightFoot: {
		marginLeft: 10,
		marginTop:40,
		transform: [{scaleX: -1}]
	}
});