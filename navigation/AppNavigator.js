import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import SettingsScreen from '../screens/SettingsScreen';

// ES6 syntax: { HomeScreen } is the same as { HomeScreen: HomeScreen}.
const HomeStack = createStackNavigator({ HomeScreen });

/*Recall: HomeStack becomes the screen that Tabnavigator renders.
 Tab options must therefore be visible for TabNavigator*/
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type = 'Ionicons'
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const TodoStack = createStackNavigator({TodoScreen});
TodoStack.navigationOptions = {
  tabBarLabel: 'ToDude',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type = 'FontAwesome'
      focused={focused}
      name={'tasks'}
    />
  ),
};

const SettingsStack = createStackNavigator({ SettingsScreen });

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type = 'Ionicons'
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  )
};

/* Acts the same way as stackNavigator, but with the inclusion of a Tabbar
that automticly implements navigation between routes (screens)*/
export default createBottomTabNavigator({
  HomeStack,  // The different routes
  TodoStack,
  SettingsStack,
});
// Does it have to be a Stack-component? Or could it be an ordinary component, like Homescreen?
