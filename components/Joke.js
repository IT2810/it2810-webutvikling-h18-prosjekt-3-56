import React, { Component } from 'react';
import {Platform, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


export default class Joke extends Component {
  //Status is a variable that shows which text is being shown in the ui
  //Status = 0 means that setup is being shown, 1 means that punchline is being shown
  constructor(props){
    super(props);
    this.state = {
      setup: "",
      punchline: "",
      status: 0
    }
    this.clickBox = this.clickBox.bind(this);
  }

  //Fetches a first joke
  componentDidMount(){
    this.fetchJoke();
  }


  render() {
    return (
      <TouchableOpacity activeOpacity = {1} style = {styles.topac} onPress = {this.clickBox}>
        {
          this.state.status
          ? <Text style = {[styles.textShadow, styles.punch]}>{this.state.punchline}</Text>
          : <Text style = {[styles.textShadow, styles.setup]}>{this.state.setup}</Text>
        }
      </TouchableOpacity>
    );
  }

  //Gets called when the TouchableOpacity gets pressed. Changes the state
  //which results in the component being re-rendered with new part of a joke.
  //The else: Means that the box has been pressed while punchline is showing,
  //that means we need to fetch a new joke.
  clickBox(){
    if(this.state.status == 0){
      this.setState({
        status: 1
      })
    }
    else{
      this.fetchJoke();
    }
  }


  //Fetches a joke from the open API "official joke api" and changes the components state.
  fetchJoke(){
    let joke = fetch("https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke")
    .then(function(response){
      if(response.status == "200"){
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
      justifyContent: 'center',
      flexDirection: 'column',
      borderBottomColor:'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      }
    ,
    setup:{
      fontSize:35,
      textAlign:'center'

    },
    punch:{
      fontSize:45,
      color:'#f39c12',
      textAlign:'center'
    },
    textShadow: Platform.OS === 'ios' ?
    {
      margin: 3,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius:4,
      textAlign:'center'

    } :
    {
      elevation: 2,
      borderColor:"#bbb",
      borderWidth:2,
      textAlign:'center',
      margin: 3,

     }
  }
)
