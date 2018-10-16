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
  }
  componentDidMount(){
    this.fetchJoke();
  }
  render() {
    return (
      <View>
        <View className = "left">
          <Text onPress = {() =>{this.clickBox}}>{this.state.setup}</Text>
          <Text>{this.state.punchline}</Text>
        </View>
        <View className = "right">
        </View>
      </View>
    );
  }
  clickBox(){

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
        punchline: data.punchline
      })
    })
  }
}
