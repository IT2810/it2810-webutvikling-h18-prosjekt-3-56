import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Swipeout from 'react-native-swipeout';

//Component that shows a task. Task text is passed as a prop from TodoScreen.
//Using a 3rd party library called swipeout that lets you have nice buttons
//that you can swipe out.
export default class Task extends Component {

  constructor(props){
    super(props);
    this.swipeoutBtns = [
      {
        text:'Done',
        backgroundColor: "#2ecc71",
        //Callback to todoscreen, calls the method doneClicked. Removes the task
        //from the state and the async storage gets updated.
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
