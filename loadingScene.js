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
import FBSDK , {LoginManager,AccessToken} from 'react-native-fbsdk';
import loadingStyles from './loadingSceneStyles'


var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window')
var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});


var PageOne = React.createClass ( {
  _handlePressId(Id) {

    this.props.navigator.replace({id: Id,});
  },

  _TestRegistration(){
    var self = this;
      LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
        if (result.isCancelled){
          this._handlePress2;
        }
        else{
          AccessToken.getCurrentAccessToken().then(
                  (data) => {
                  AsyncStorage.getItem('databaseTOKEN').then((value)=>{
                    if(value == null){
                      AsyncStorage.setItem('databaseTOKEN',JSON.stringify(data.accessToken));
                    }
            });

            self._handlePressId(2);
        })
      }})
    },

    _checkToken(){
      AsyncStorage.getItem('databaseTOKEN').then((value)=>{
         if(value !== null){
           this._handlePressId(2);
         }})
    },

  render() {
    return (
      <Image
        source = {require('./images/Rectangle.png')}
        style = {{width : width}}>
        {this._checkToken()}
        <TouchableOpacity onPress={() => this._handlePressId(7)}>
            <Image
              source = {require('./images/policy.png')}
              style = {loadingStyles.Policy}/>
        </TouchableOpacity>
        <View style={loadingStyles.container}>
        <Image
          style={loadingStyles.imageLogo}
          source={require('./images/logo2.png')}/>
        <Text style={loadingStyles.welcome}>Welcome to RunnerPro</Text>
        <Text style = {loadingStyles.TextRunnForGood}>Everything you need to be health</Text>
        <Text style = {loadingStyles.TextRunnForGood}>& beat your goals</Text>
          <TouchableOpacity  onPress={() => this._handlePressId(5)}>
            <View
              style={loadingStyles.buttonSingUpWithEmail} >
              <Text style={loadingStyles.buttomGetText}>Sing Up with Email</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._TestRegistration}>
            <View style={loadingStyles.buttonSingUpWithFacebook}>
              <Text style={loadingStyles.buttomGetText}>Sing Up with Facebook</Text>
            </View>
          </TouchableOpacity>
          <View style={{flex:0.1}}>
          <TouchableOpacity onPress ={() => this._handlePressId(4)}>
            <Text style={loadingStyles.text}> Alredy have my account </Text>
          </TouchableOpacity>
          </View>
        </View>
      </Image>

    )
  }
});

module.exports = PageOne;
