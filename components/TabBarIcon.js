import React from 'react';
import {Ionicons, Octicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {

  Ionicon = () => {
    return (<Ionicons
      name={this.props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />)
  }

  Octicon = () => {
    return (<Octicons
      name={this.props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />)
  }

  icon = type => {
    if (this.props.import === 'Ionicons'){
      return this.Ionicon();
    }
    else if (this.props.import === 'Octicon'){
      return this.Octicon();
    }
  }

  render() {
    return this.icon();
  }
}