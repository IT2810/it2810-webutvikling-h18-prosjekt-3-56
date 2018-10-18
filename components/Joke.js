import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Dimensions from 'Dimensions';


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

  shouldShrink = () => Dimensions.get('window').height < 700

  componentDidMount(){
    this.fetchJoke();
  }

  render() {
    console.log(this.state.status);
    return (
      <TouchableOpacity activeOpacity = {1} style = {styles.topac} onPress = {this.clickBox}>
        {
          this.state.status
          ? <Text style = {[styles.punch, this.shouldShrink() ? {fontSize: 35} : {}]}>{this.state.punchline}</Text>
          : <Text style = {[styles.setup, this.shouldShrink() ? {fontSize: 25} : {}]}>{this.state.setup}</Text>
        }
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

const styles = StyleSheet.create(
  {

    topac:{
      flex:1,
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS

      elevation: 2, // Android
      justifyContent: 'center',

      flexDirection: 'column',

      borderBottomColor:'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    setup:{
      fontSize:35,
      textAlign:'center'
    },
    punch:{
      fontSize:45,
      color:'#f39c12',
      textAlign:'center'

    }
  }
)
