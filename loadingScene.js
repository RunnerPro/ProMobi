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
        source = {require('./Rectangle.png')}
        style = {{width : width}}>
        {this._checkToken()}
        <TouchableOpacity onPress={() => this._handlePressId(7)}>
            <Image
              source = {require('./policy.png')}
              style = {styles.Policy}/>
        </TouchableOpacity>
        <View style={styles.container}>
        <Image
          style={styles.imageLogo}
          source={require('./logo2.png')}/>
        <Text style={styles.welcome}>Welcome to RunnerPro</Text>
        <Text style = {styles.TextRunnForGood}>Everything you need to be health</Text>
        <Text style = {styles.TextRunnForGood}>& beat your goals</Text>
          <TouchableOpacity  onPress={() => this._handlePressId(5)}>
            <View
              style={styles.buttonSingUpWithEmail} >
              <Text style={styles.buttomGetText}>Sing Up with Email</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._TestRegistration}>
            <View style={styles.buttonSingUpWithFacebook}>
              <Text style={styles.buttomGetText}>Sing Up with Facebook</Text>
            </View>
          </TouchableOpacity>
          <View style={{flex:0.1}}>
          <TouchableOpacity onPress ={() => this._handlePressId(4)}>
            <Text style={styles.text}> Alredy have my account </Text>
          </TouchableOpacity>
          </View>
        </View>
      </Image>

    )
  }
});

const styles = StyleSheet.create({
  Policy :{
    width:width/17 ,
    height : height/17,
    top : height /50,
    left : width*8/9,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },

  TextRunnForGood : {
    fontFamily : 'Roboto-Regular',
    fontSize : 15
  },
  navBar: {
    height: height / 5,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

  },
  imgPolicy:{
    height:width/10,
    width:width/10,
    top: -width/15,
    bottom: 0,
    left: width,
    right: 0,
  },
  ViewForButton:{
        position: 'absolute',
        height: 150,
        bottom: 0,
        width: width,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
  },
  text : {
    paddingTop: 10,
    textAlign: 'center',
    color : '#7002FF',
    marginBottom : 50,
    fontFamily : 'Roboto-Regular'
  },
  container: {
    flex: 1,
    alignItems : 'center'


  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#460D80',
    marginTop : width/2,
    fontFamily : 'Roboto-Light'
  },
  buttomGetText: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontFamily : 'Roboto-Regular',

  },
  buttonSingUpWithEmail: {
    height: height/10,
    width: width*8/10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#7002FF',
    marginBottom : 10,
    borderRadius : 5,
    marginTop : width/3,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  buttonSingUpWithFacebook: {
    height: height/10,
    width: width*8/10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3b5998',
    borderRadius : 5,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  imageLogo: {
    left: width/2 - width/6 ,
    right: 0,
    top: height/5- width/5,
    bottom:0 ,
    position: 'absolute',
    height:width/3,
    width:width/3,

  }
});


module.exports = PageOne;
