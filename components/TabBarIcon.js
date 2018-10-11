import React from 'react';
import {Ionicons, Octicons, FontAwesome} from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {

  createProps = () => ({
    name: this.props.name,
    size: 26,
    style: { marginBottom: -3 },
    color: this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
    })

  icon = () => {
    const e = React.createElement;
    const {type} = this.props
    if (type === 'Ionicons'){
      return e(Ionicons, this.createProps());
    }
    else if (type === 'FontAwesome'){
      return e(FontAwesome, this.createProps());
    }
    else if (type === 'Octicons'){
      return e(Octicons, this.createProps());
    }
  }

  render() {
    return this.icon();
  }
}