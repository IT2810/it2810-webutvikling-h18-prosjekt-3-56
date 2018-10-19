import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';

// Must import so that the stacks can use them as screens
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import SettingsScreen from '../screens/SettingsScreen';

/*Creates a stack of components to navigate between.In our case the 
components are screens and we only have one of them in each stack*/
// ES6 syntax: { HomeScreen } is the same as { HomeScreen: HomeScreen}.
const HomeStack = createStackNavigator({ HomeScreen });

/*Tab options is set on each screen (stack) so that it becomes visible
for the TabNavigator (see below). Equivolent to navigationOptions-field in
homescreen class*/
HomeStack.navigationOptions = {
  tabBarLabel: ({focused}) => (
    <Text
     style = {{color: focused ? Colors.tabIconSelected : Colors.tabIconDefault, textAlign:'center'}}>
      Home
    </Text> ),
  tabBarIcon: ({ focused }) => (  // The icon component to render
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
  tabBarLabel: ({focused}) => (
    <Text
     style = {{color: focused ? Colors.tabIconSelected : Colors.tabIconDefault,textAlign:'center' }}>
      Todo
    </Text> ),
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
  tabBarLabel: ({focused}) => (
    <Text
     style = {{color: focused ? Colors.tabIconSelected : Colors.tabIconDefault, textAlign:'center'}}>
      Settings
    </Text> ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type = 'Ionicons'
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  )
};

/* Acts the same way as stackNavigator, but with the inclusion of a Tabbar
that automticly implements navigation between routes (the stacks created above)*/
export default createBottomTabNavigator({
  HomeStack,  // The different routes
  TodoStack,
  SettingsStack,
});
