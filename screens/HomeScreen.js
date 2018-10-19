import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Pedometer from '../features/MotivatingPedometer.js';
import Joke from '../components/Joke.js';

export default class HomeScreen extends React.Component {

// Display options for this screen. Used by the navigator that renders it
  static navigationOptions = {
    title: 'Home'
  };

/*This screen will render two components that gets 50% of the screen each
because bothe have the flex:1 property*/
  render() {
    return (
      <View style={styles.container}>
        <Pedometer/>
        <Joke/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
