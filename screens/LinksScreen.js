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
      taskList : [{id: 0, text:"Refill lifejuice"}, {id: 1, text: "Smirk to stranger"}]
    };
  }


  static navigationOptions = {
    title: 'ToDude',
  };




  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.taskList.map((task) => {
            return(
            <Swipeout style = {styles.margin} key = {task.id} right = {swipeoutBtns}>
              <Task id = {task.id} text = {task.text}/>
            </Swipeout>)
          })
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  margin:{
    marginBottom:5
  }
});
