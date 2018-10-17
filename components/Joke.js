import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


export default class Joke extends Component {
  constructor(props){
    super(props);
    this.state = {
      setup: "",
      punchline: "",
      status: 0
    }
    this.clickBox = this.clickBox.bind(this);
  }
  componentDidMount(){
    this.fetchJoke();
  }
  render() {
    console.log(this.state.status);
    return (
      <TouchableOpacity onPress = {this.clickBox}>
        <View className = "left">
          {
            this.state.status ? <Text>{this.state.punchline}</Text> : <Text>{this.state.setup}</Text> 
          }
        </View>
        <View className = "right">
        </View>
      </TouchableOpacity>
    );
  }
  clickBox(){
    console.log(this.state);
    if(this.state.status == 0){
      this.setState({
        status: 1
      })
    }
    else{
      this.fetchJoke();
    }
  }
  fetchJoke(){
    let joke = fetch("https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke")
    .then(function(response){
      if(response.status == "200"){
        console.log(typeof response);
        return response.json();
      }
      else{
        console.log("Not a joke");
      }
    })
    .then((data) => {
      this.setState({
        setup: data.setup,
        punchline: data.punchline,
        status: 0
      })
    })
  }
}
