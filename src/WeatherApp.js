import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Style from './Style';

export default class WeatherApp extends Component {
  render() {
    return (
      <View style={Style.container}>
        <Text style={Style.welcome}>
          Welcome to Weather App
        </Text>
        <Text style={Style.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={Style.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('WeatherApp', () => WeatherApp);
