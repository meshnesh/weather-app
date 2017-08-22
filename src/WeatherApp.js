'use strict';
import PureComponent from 'react-pure-render/mixin';

import React from "react-native"

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Animated,
  ScrollView,
} from "react-native"
import Style from './Style';

import fetchWeather from "./app/api/api"
import weatherIcon from "./app/utils/icons"
import KeyboardMixin from "./app/utils/keyboard"

const WeatherApp = React.createClass({
// export default class WeatherApp extends Component {
  mixins: [PureComponent, KeyboardMixin],

  getInitialState() {
    return {
      city: "Bucuresti",
      country: "Romania",
      weatherType: "Clear",
      temperature: 21,
      searchedCity: "Bucuresti",
      val: new Animated.Value(0),
      currentColor: "rgba(255,255,255,0.5)",
      nextColor: this._randomColor(),
      icon: weatherIcon()
    };
  },

  getWeather() {
    fetchWeather(this.state.searchedCity).then((response) => {
      let weatherList = response.list[0]

      // Store nextColor, since we'd like to start next time with it.
      var current = this.state.nextColor;

      // Reset animation
      this.state.val.setValue(0);

      this.setState({
        temperature: weatherList.main.temp,
        city: weatherList.name,
        country: weatherList.sys.country,
        weatherType: weatherList.weather[0].main,
        currentColor: current,
        nextColor: this._randomColor(),
        icon: weatherIcon(weatherList.weather[0].icon)
      });

    });
  },


  render() {
    var backgroundColor = this.state.val.interpolate({
        inputRange: [0, 1],
        outputRange: [
          this.state.currentColor,
          this.state.nextColor
        ],
      });


    // Start the animation
    Animated.spring(this.state.val, {
      tension: 1,
      friction: 20,
      toValue: 1
    }).start();


    return (
      <Animated.View style={{
        backgroundColor: backgroundColor,
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center"}}>
        <View style={{marginBottom: this.state.keyboardSpace}}>
          <View style={[Style.animatedContainer]}>
            <Text style={Style.icon}>
              {this.state.icon}
            </Text>
            <Text style={Style.temperature}>
              {Math.round(this.state.temperature) + "°C"}
            </Text>
            <Text style={Style.location}>
              {this.state.city}, {this.state.country}
            </Text>
            <Text style={Style.weatherType}>
              {this.state.weatherType}
            </Text>
            <TextInput style={Style.input}
                       onChangeText={this.onChangeText}
                       onSubmitEditing={this.getWeather}
                       clearButtonMode={"always"}
                       clearTextOnFocus={true}
                       enablesReturnKeyAutomatically={true}
                       returnKeyType={"search"}/>
          </View>
        </View>
      </Animated.View>
    );
  },

  onChangeText(searchedCity) {
    this.setState({
      searchedCity: searchedCity
    })
  },

  _randomColor() {
    var colors = [0, 1, 2].map(() => Math.ceil(Math.random() * 255));

    return "rgba(" + colors.join(",") + ",0.6)"
  }
});


AppRegistry.registerComponent('WeatherApp', () => WeatherApp);
