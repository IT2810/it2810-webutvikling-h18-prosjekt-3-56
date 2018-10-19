import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


//Component that lets you type in a task and add it to the tasks.
//This is done by doing a callback to TodoScreens addTask function.
export default class AddTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }
  render() {
    return (

        <View style = {styles.container}>
          <TextInput style = {styles.input} placeHolder = "The road to success is action." onChangeText = {(text) => this.setState({text})}/>
          <TouchableOpacity style = {styles.topac} onPress ={() => {this.state.text !== "" ? this.props.click(this.state.text) : null}}>
            <Text style = {styles.button}>ADD</Text>
          </TouchableOpacity>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#f1c40f'
  },
  input:{
    height:50,
    flex:0.8,
    fontSize:20
  },
  topac:{
    flex:0.2,

  },
  button:{
    height:50,
    backgroundColor:'#f39c12',
    fontSize: 17,
    textAlign:'center',
    paddingTop:14,
    paddingBottom:14
  }
})
