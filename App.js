import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  tasks = {
    tasks: null
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading  // (Very) Useful for caching assets thats required for the app to render
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator tasks = {this.tasks} />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {  // Burde vi implementere Async-storage her? Under er eksempel bruk
    /*const asset = [
      require('./assets/asset1.type'),
      require('./assets/asset2.type'),
    ];

    const cacheAssets = Assets.map(asset => asset.fromModule(asset).downloadAsync());
    return Promise.all(cacheAssets) */
    console.log("Hei");
    try {
      const value = await AsyncStorage.getItem('tasks');
      if (value !== null) {
        // We have data!!
        console.log(value);
        tasks = {
          tasks:value
        };
      }
      else if (value === null) {
        console.log("There was no data stored");
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
      return error;
    }
  };

  _handleLoadingError = error => {  // Called if the startAsync-prop returns an error
    console.warn(error);

  };

  _handleFinishLoading = () => {  // Called after promise is resolved from _loadResourceAsync
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
