import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  PropTypes,
  AsyncStorage,
  TextInput

} from 'react-native';

import PageOne from './loadingScene'
var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window');

import TextField from 'react-native-md-textinput';
import FBSDK , {LoginManager ,LoginButton, AccessToken} from 'react-native-fbsdk';


class SingUpScreen extends Component {
  constructor(props) {
    super(props);
    this.inputs = {
      name: '',
      password: '',
    };
    this._TestRegistration = this._TestRegistration.bind(this);
  }

    _handlePressId(Id) {
      this.props.navigator.replace({id: Id,});
    }

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
    }

render() {
  return (
    <Image
      source = {require('./Rectangle.png')}
      style = {{width : width}}>
      <View style={styles.container}>
      <View style = {styles.navBar}>
        <Text style = {styles.navBarText}> LOG IN</Text>
        <TouchableOpacity onPress={() => this._handlePressId(7)}>
            <Image
              source = {require('./policy.png')}
              style={styles.imgPolicy}/>
          </TouchableOpacity>
        <View style = {styles.BarForBack}>
          <TouchableOpacity onPress={() => this._handlePressId(1)}>
            <Image
            source={require('./back.png')}
            style ={styles.imgBack}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style ={styles.Account}>
        <TextField

          label={'User Name'}
           labelColor={'#000'}
          highlightColor={'#460D80'}
          textFocusColor={'#460D80'}
          textBlurColor={'#460D80'}
          onChangeText={(text) => {
            this.inputs.name = text;
       }}
       labelStyle={{
         color: '#9E9E9E',
       }}
        />
        <TextField

          label={'Password'}
          highlightColor={'#460D80'}
          textFocusColor={'#460D80'}
          textBlurColor={'#460D80'}
          secureTextEntry = {true}
          onChangeText={(text) => {
            this.inputs.password = text;
       }}
          labelStyle={{
            color: '#9E9E9E',
            }}
           />
      </View>
      <View style ={{flex:2}}>
            <TouchableOpacity>
              <View style={styles.buttomGet}>
                <Text style={styles.buttomGetText}>Log up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._TestRegistration} >
                <View style={styles.buttonSingUpWithFacebook}>
                  <Text style={styles.buttomGetText}>Log with Facebook</Text>
                </View>
              </TouchableOpacity>
            <Text style={styles.text}>Forgot Password</Text>
            </View>
      </View>
    </Image>
    );
  }
}
const styles = StyleSheet.create({

  imgPolicy:{
    height:width/9,
    width:width/9,
    top: -width/13,
    bottom: 0,
    left: width - width/10,
    right: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  text : {
    paddingTop: 10,
    textAlign: 'center',
    color : '#7002FF',
    marginBottom : 50,
    fontFamily : 'Roboto-Regular',
  },
  container: {
    flex: 1,
    justifyContent : 'flex-start',
    alignItems : 'center',
    padding:10,
    paddingTop: 80,

  },
  buttomGetText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontFamily : 'Roboto-Regular'
  },
  buttomGet: {
    height : height / 13,
    width: width*8/10,
    marginLeft : width/60,
    backgroundColor: '#00CC66',
    borderRadius : 5,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  buttonSingUpWithFacebook: {
    height : height/13,
    width: width*8/10,
    marginTop : 10,
    marginLeft : width/60,
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
  ViewForLogo:{
    flex:1,
  },
  Account:{
      flex :1,
      height: height/30,
      width: width*8/10,
      backgroundColor : 'transparent',
      padding: 4,
      marginLeft : width/60,
  },
  navBarText: {
    color: '#000000',
    textAlign: 'center',
    marginTop : 30,
    fontFamily : 'Roboto-Regular',
  },
  navBar: {
    height: 64,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

  },
  imgBack:{
    left: 0,
    right: 0,
    top: 20,
    bottom:0 ,
    position: 'absolute',
    height:width/10,
    width:width/9,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  BarForBack :{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position : 'absolute',
    height : 70,
    width : 70,
  },
});

module.exports = SingUpScreen;
