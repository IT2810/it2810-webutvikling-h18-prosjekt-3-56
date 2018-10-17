import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Swipeout from 'react-native-swipeout';


export default class Task extends Component {

  constructor(props){
    super(props);
    this.swipeoutBtns = [
      {
        text:'Done',
        backgroundColor: "#2ecc71",
        //onPress = function to change state, task has been completed
        onPress: () => this.props.click(props.id)

      }
    ]
  }

  render() {
    return (
      <Swipeout autoClose = {true} style = {styles.margin} right = {this.swipeoutBtns}>
        <View style = {styles.container}>
          <Text style = {[styles.fineText, styles.font]}>{this.props.text}</Text>
        </View>
      </Swipeout>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    height: 'auto',
    backgroundColor:'white'
  },
  font:{
    fontSize: 25,
    padding:3
  },
  margin:{
    marginBottom:1
  }
})
