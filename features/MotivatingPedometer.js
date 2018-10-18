import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Pedometer} from 'expo';
import {ProgressCircle }  from 'react-native-svg-charts';
import {Foundation} from '@expo/vector-icons';
import Dimensions from 'Dimensions';

export default class MotivatingPedometer extends Component{

	state = {
		stepGoal: 1000,
		currentStepCount: 100,
	};

	componentDidMount() {
		this._subscribe();
		this.footSize = Dimensions.get('window').height > 600 ? 100 : 50;
		this.textSize = Dimensions.get('window').height > 600 ? 35 : 20;
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

		Pedometer.getStepCountAsync(new Date().setHours(0,0,0), new Date()).then(
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
	
	_unsubscribe = () => {
		this._subscription && this._subscription.remove();
		this._subscription = null;
	}

	validateInput = text => {
		isNaN(text) ? Alert.alert("Error", "Please type a number") : this.setState({stepGoal: text})
	};

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
					<View style={styles.innerLeft}>
						<Foundation name = 'foot' size = {this.footSize} />
						<Foundation name = 'foot' size = {this.footSize} style = {styles.rightFoot}/>
					</View>
					<View style={styles.innerRight}>
						<Text style = {{fontWeight: '400', fontSize: this.textSize}}>   {this.state.currentStepCount + " /"}</Text>
						<TextInput
						style={{fontWeight: '400', fontSize: this.textSize}}
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