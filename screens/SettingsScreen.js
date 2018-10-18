import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return <View style = {styles.container}>
      <Text>This is the third settings screen. It is not implemented in
      this prototype. 
      </Text>
    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#fff',
  },
});
