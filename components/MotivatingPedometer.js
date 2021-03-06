import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Pedometer} from 'expo';
import {ProgressCircle }  from 'react-native-svg-charts';
import {Foundation} from '@expo/vector-icons';
import Dimensions from 'Dimensions';
import {isPositiveInteger as validateInput} from '../util/util.js';

export default class MotivatingPedometer extends Component{

	state = {
		stepGoal: 1000,
		currentStepCount: 100,
	};

	componentDidMount() {
		this._subscribe();
		this.footSize = Dimensions.get('window').height > 700 ? 100 : 50;
		this.textSize = Dimensions.get('window').height > 700 ? 35 : 25;
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
				console.log(error);
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

	trySetState = text => validateInput(text) ?
		this.setState({
			stepGoal: text
		}) :
		Alert.alert('Please type a valid number') 


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
						onSubmitEditing={(event) => this.trySetState(event.nativeEvent.text)}
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
	wrap:{
		flexDirection:"column",
	},
	innerRight: {
		alignItems: "center",
		justifyContent: "center",
		height: "40%",
		width: "100%",
		marginBottom:"3%"
	},
	innerLeft: {
		flexDirection: "row",
		height: '45%',
		width: '100%',
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
