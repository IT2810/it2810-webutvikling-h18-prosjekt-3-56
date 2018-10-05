import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Task from '../components/Task.js'
import Swipeout from 'react-native-swipeout';

import AddTask from '../components/AddTask.js'

let swipeoutBtns = [
  {
    text:'Done',
    backgroundColor: "#2ecc71"
    //onPress = function to change state, task has been completed
  }
]
export default class LinksScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      taskList : [{id:0, text:"Refill lifejuice"}, {id: 1, text: "Smirk to stranger"}]
    };
    this.addTaskClicked = this.addTaskClicked.bind(this);
  }


  static navigationOptions = {
    title: 'ToDude',
  };

  render() {
    return (
      <View style = {styles.container}>
        <AddTask style = {styles.taskAdder} click = {this.addTaskClicked}/>
        <ScrollView style={styles.scroller}>
          {
            this.state.taskList.map((task) => {
              console.log("hei");
              return(
              <Swipeout key = {task.id} style = {styles.margin} right = {swipeoutBtns}>
                <Task text = {task.text}/>
              </Swipeout>)
            })
          }
        </ScrollView>
      </View>
    );
  }

  addTaskClicked(tex){
    console.log("Clicku");
    this.setState((prevState) => ({
      taskList: [...prevState.taskList, {id: prevState.taskList.length -1, text: tex}]
    }))
    console.log(this.state.taskList);

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#34495e',
  },
  taskAdder:{

  },
  scroller: {
  },
  margin:{
    marginBottom:5
  }
});
