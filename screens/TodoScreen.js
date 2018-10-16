import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Task from '../components/Task.js'
import Swipeout from 'react-native-swipeout';

import AddTask from '../components/AddTask.js'



export default class TodoScreen extends React.Component {

  //
  constructor(props){
    super(props);
    this.state= {
      taskList: []
    }
    //has the initial data read been executed?
    this.dataRead = false;

    this.addTaskClicked = this.addTaskClicked.bind(this);
    this.doneClicked = this.doneClicked.bind(this)
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
              return(
                <Task key = {task.id} text = {task.text} id = {task.id} click = {this.doneClicked}/>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }

  componentDidMount(){
    console.log("2");
    if(this.dataRead){

    }
    else{
      this.initData();
      console.log("as");
    }
  }
  //Finds the element in the ltruetrueist and removes it from the taskList in state
  doneClicked(id){
    this.setState((prev) => {
      for(let i = 0; i < prev.taskList.length; i++){
        console.log(prev.taskList[i]);
        if (prev.taskList[i].id == id){
          prev.taskList.splice(i,1);
          array = prev.taskList;
          return {taskList: array};
        }
        else{
          console.log("If this prints, you have problem");
        }
      }

    }
    );
  }

  //Adds new task. The id will become id of last element +1 unless the lists length is 0
  addTaskClicked(tex){
    this.setState((prevState) =>
      {
        if (prevState.taskList.length!= 0){
          id = prevState.taskList[prevState.taskList.length -1].id + 1;
          console.log(id);
          return {taskList: [...prevState.taskList, {id: id, text: tex}]}
        }
        else{
          return {taskList: [...prevState.taskList, {id: 0, text: tex}]}
        }
    }, () => {
      this.storeData(this.state);

    }
  )}

  //Reads all data in db with key "tasks" and sets the variable dataRead = true
  initData = async() =>{
    try {
      const value = await AsyncStorage.getItem('tasks');
      if (value !== null) {
        // We have data!!
        tasks = JSON.parse(value);
        console.log(tasks.taskList);
        this.setState(tasks);
        return tasks.taskList;
      }
      else if (value === null) {
        console.log("There was no data stored");
        return {tasks:[]};
      }
      this.dataRead = true;
    } catch (error) {
      console.log(error);
      // Error retrieving data
      return error;
    }
  }

  storeData = async(data) =>{
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(data));
    } catch (error) {
    // Error saving data
      console.log(error);
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ecf0f1',
  },
  taskAdder:{

  },
  scroller: {
  }
});
