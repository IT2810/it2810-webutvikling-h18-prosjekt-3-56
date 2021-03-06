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
import Task from '../components/Task.js';
import Swipeout from 'react-native-swipeout';
import {removeItem} from '../util/util.js';
import AddTask from '../components/AddTask.js';



export default class TodoScreen extends React.Component {

  //
  constructor(props){
    super(props);
    this.state= {
      taskList: []
    }
    //has the initial data read been executed?

    this.addTaskClicked = this.addTaskClicked.bind(this);
    this.doneClicked = this.doneClicked.bind(this)
  }

  static navigationOptions = {
    title: 'Todo',
  };

  //Renders addtask and all tasks in state.tasklist
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
      this.initData();
  }

  //Removes the task that has been finished from state and updates async storage.
  doneClicked(id){
    this.setState((prev) => ({
      taskList: removeItem(id, prev.taskList)
    }), () => {
      this.storeData(this.state, 'tasks');
    }
  );
  }

  //Adds new task. The id will become id of last element +1 unless the lists length is 0
  addTaskClicked(tex){
    this.setState((prevState) =>
      {
        if (prevState.taskList.length!= 0){
          id = prevState.taskList[prevState.taskList.length -1].id + 1;
          return {taskList: [...prevState.taskList, {id: id, text: tex}]}
        }
        else{
          return {taskList: [...prevState.taskList, {id: 0, text: tex}]}
        }
    }, () => {
      this.storeData(this.state, 'tasks');

    }
  )}

  //Reads all data in db with key "tasks".
  initData = async() =>{
    try {
      const value = await AsyncStorage.getItem('tasks');
      if (value !== null) {
        // We have data!!
        tasks = JSON.parse(value);
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

  //Loads the data with key = key in async storage and returns it
  loadData = async(key) =>{
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        data = JSON.parse(value);
        return data;
      }
      else if (value === null) {
        console.log("There was no data stored");
        return {};
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
      return error;
    }
  }

  //Stores data in async storage
  storeData = async(data, key) =>{
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
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
