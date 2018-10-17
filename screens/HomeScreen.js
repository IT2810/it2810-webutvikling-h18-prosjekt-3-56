import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Pedometer from '../features/MotivatingPedometer.js';

export default class HomeScreen extends React.Component {

  static navigationOptions = {  // Display options for this screen. Used by the navigator that renders it
    title: 'Home'
  };

  render() {
    return (
      <View style={styles.container}>
        <Pedometer />
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
