import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  MapView,
  Dimensions,
  Image,
  Alert,
  PropTypes,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import PageOne from './loadingScene'
import PageTwo from './MapScene'
import PageLctyvityLog from './ActyvityLog'
import SingUp from './SingUpScreen'
import RegistrScreen from './RegistrScreen'
import TestBK from './TestBK'
import Policy  from './Policy'
import Ditails from './Ditails'

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

const { width, height } = Dimensions.get('window')

class ReactNativeNavigationExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nomberSceen : 1
    }
  }

  _renderScene(route, navigator) {
    if (route.id == 1) {
      return <PageOne navigator={navigator} />
    } if (route.id == 2) {
      return <PageTwo navigator={navigator} />
    }
    if (route.id == 3){
      return <PageLctyvityLog navigator ={navigator}/>
    }
    if (route.id == 4){
      return <SingUp navigator = {navigator}/>
    }
    if (route.id == 5){
      return <RegistrScreen navigator = {navigator}/>
    }
    if (route.id == 6){
      return <TestBK navigator = {navigator}/>
    }
    if (route.id == 7){
      return <Policy navigator = {navigator}/>
    }
    if (route.id == 8){
      return <Ditails navigator = {navigator}/>
    }
  }
  render() {
    return (
      <Navigator
          ref = "mainNavigator"
         initialRoute={{id: this.state.nomberSceen, }}
         renderScene={this._renderScene}
         configureScene={this._configureScene}
        />
    );
  }
};
AppRegistry.registerComponent('RunnerPro', () => ReactNativeNavigationExample);
