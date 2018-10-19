import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Pedometer} from 'expo';
import {ProgressCircle }  from 'react-native-svg-charts';
import {Foundation} from '@expo/vector-icons';
import Dimensions from 'Dimensions';


// A component that renders the entire layout af the pedometer
// Used on 50% on the home screen
export default class MotivatingPedometer extends Component{

	state = {  // just some initial values. Arent actually used.
		stepGoal: 1000,
		currentStepCount: 100,
	};

	componentDidMount() {
		this._subscribe();
		// sizes for icon and text that should be used based on screen size
		this.footSize = Dimensions.get('window').height > 700 ? 100 : 50;
		this.textSize = Dimensions.get('window').height > 700 ? 35 : 25;
	};


	componentWillUnmount() {
		this._unsubscribe();
	};

	_subscribe = () => {  // Adds a subscription for listening on steps taken
		this._subscription = Pedometer.watchStepCount(result => {
			this.setState({
				currentStepCount: result.steps
			});
		});
		//Steps are automaticly Async downloaded with this subscription. Keeps count for last seven days

		// Retrives (Async) steps taken since midnight the same day.
		const start = new Date();
		const end = new Date();
		start.setHours(0,0,0);
		Pedometer.getStepCountAsync(start, end).then(
			result => {
				this.setState({ currentStepCount: result.steps });
			},
			error => {
				this.setState({
					 currentStepCount: 100
				});
			}
		); 
	}; 
	
	_unsubscribe = () => {  // ends the subscription
		this._subscription && this._subscription.remove();
		this._subscription = null;
	}

	validateInput = text => Number(text) > 0  // is input a valid number?
		? Alert.alert("Error", "Please type a valid number") : this.setState({stepGoal: text})

	render(){
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
					<View style={styles.innerRight}>
						<Text style = {{fontWeight: '400', fontSize: this.textSize}}>   {this.state.currentStepCount + " /"}</Text>
						<TextInput
						style={{fontWeight: '400', fontSize: this.textSize}}
						placeholder= "1000"
						onSubmitEditing={(event) =>
						this.validateInput(event.nativeEvent.text)}
						/>
					</View>
					<View style={styles.innerLeft}>
						<Foundation name = 'foot' size = {this.footSize} />
						<Foundation name = 'foot' size = {this.footSize} style = {styles.rightFoot}/>
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
		flexDirection: "column-reverse",
		alignItems: "center",
		position: "absolute",
		zIndex: 1,
		width: "100%",
		height: "90%",
	},
	innerRight: {
		alignItems: "center",
		justifyContent: "center",
		height: "40%",
		width: "40%",
	},
	innerLeft: {
		flexDirection: "row",
		height: '45%',
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