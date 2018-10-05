import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


export default class AddTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }
  render() {
    return (
      <TouchableOpacity onPress ={() => {this.props.click(this.state.text)}}>
        <View style = {styles.container}>
          <TextInput style = {styles.input} placeHolder = "The road to success is action." onChangeText = {(text) => this.setState({text})}/>
          <Text style = {styles.button}>Add Task</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'green'
  },
  input:{
    height:50,
    flex:0.8,
    fontSize:20
  },
  button:{
    height:50,
    flex:0.2,
    backgroundColor:'red',
    fontSize: 15,
    textAlign:'center',
    paddingTop:14,
    paddingBottom:14
  }
})
