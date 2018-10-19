import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {  // renders loading screen if app still loading
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading  // (Very) Useful for caching assets thats required for the app to render
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {  // App done loading and renders the actual application
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator/>
        </View>
      );
    }
  }

  /* Example on how we could download and load asyncronously
   resources that are required at all times by the app. Like fonts, etc.*/
  _loadResourcesAsync = async () => {
    /*const asset = [
      require('./assets/asset1.type'),
      require('./assets/asset2.type'),
    ];
    const cacheAssets = Assets.map(asset => asset.fromModule(asset).downloadAsync());
    return Promise.all(cacheAssets) */
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
