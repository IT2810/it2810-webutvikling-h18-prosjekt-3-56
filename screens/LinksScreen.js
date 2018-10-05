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
    backgroundColor: "#00ff00"
    //onPress = function to change state, task has been completed
  }
]
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Todude',
  };


  render() {
    return (
      <ScrollView style={styles.container} backgroundColor = "transparent">
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Swipeout right = {swipeoutBtns}>
          <Task text = "Buggydi Woop"/>
        </Swipeout>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
