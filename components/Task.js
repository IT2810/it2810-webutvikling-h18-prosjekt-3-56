import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default class Task extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style = {[styles.fineText, styles.font]}>{this.props.text}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    height: 'auto',
    backgroundColor:'#3498db'
  },
  font:{
    fontSize: 30
  }
})
