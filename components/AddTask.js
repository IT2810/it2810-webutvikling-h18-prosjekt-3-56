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

        <View style = {styles.container}>
<<<<<<< HEAD
          <TextInput style = {styles.input} placeHolder = "The road to success is action." onChangeText = {(text) => this.setState({text})}/>
          <TouchableOpacity style = {styles.topac} onPress ={() => {this.state.text !== "" ? this.props.click(this.state.text) : null}}>
            <Text style = {styles.button}>ADD</Text>
          </TouchableOpacity>
=======
          <TextInput style = {styles.input} placeHolder = 'The road to success is action.'
             onChangeText = {(text) => this.setState({text})}></TextInput>
          <Text style = {styles.button}>ADD</Text>
>>>>>>> develop
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
