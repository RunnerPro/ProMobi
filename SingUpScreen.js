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

import singUpStyle from './SingUpScreenStyle'
import PageOne from './loadingScene'
var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window');
import TextField from 'react-native-md-textinput';
import FBSDK , {LoginManager ,LoginButton, AccessToken} from 'react-native-fbsdk';

var name = ''
var password = ''
class SingUpScreen extends Component {
  constructor(props) {
    super(props);
    this._TestRegistration = this._TestRegistration.bind(this);
  }

    _handlePressId(Id) {
      this.props.navigator.replace({id: Id,});
    }

  async _LogUp(self){
    if (name != '' && password != ''){
      try {
        let response = await fetch("https://runner-pro.herokuapp.com/api/token",{
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            username : name ,
            password : password
          })
        })
        console.log(response)
        let res = response.json()
        console.log(res)
        AsyncStorage.getItem('databaseTOKEN').then((value)=>{
          if(value == null){
            AsyncStorage.setItem('databaseTOKEN',JSON.stringify(res));
            }
          })
          self.props.navigator.replace({id: 2,})
      }catch(error){

      }
    }
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
      source = {require('./images/Rectangle.png')}
      style = {{width : width}}>
      <View style={singUpStyle.container}>
        <View style = {singUpStyle.navBar}>
          <Text style = {singUpStyle.navBarText}> LOG IN</Text>
          <TouchableOpacity onPress={() => this._handlePressId(7)}>
            <Image
              source = {require('./images/policy.png')}
              style={singUpStyle.imgPolicy}/>
          </TouchableOpacity>
        <View style = {singUpStyle.BarForBack}>
          <TouchableOpacity onPress={() => this._handlePressId(1)}>
            <Image
              source={require('./images/back.png')}
              style ={singUpStyle.imgBack}/>
          </TouchableOpacity>
        </View>
      </View>
        <View style ={singUpStyle.Account}>
          <TextField
            label={'User Name'}
            labelColor={'#000'}
            highlightColor={'#460D80'}
            textFocusColor={'#460D80'}
            textBlurColor={'#460D80'}
            onChangeText={(text) => {
              name = text;
            }}
            labelStyle={{
              color: '#9E9E9E',
            }}/>
          <TextField
            label={'Password'}
            highlightColor={'#460D80'}
            textFocusColor={'#460D80'}
            textBlurColor={'#460D80'}
            secureTextEntry = {true}
            onChangeText={(text) => {
              password = text;
            }}
            labelStyle={{
              color: '#9E9E9E',
            }}/>
        </View>
        <View style ={{flex:2}}>
          <TouchableOpacity onPress ={() => this._LogUp(this)}>
            <View style={singUpStyle.buttomGet}>
              <Text style={singUpStyle.buttomGetText}>Log up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._TestRegistration} >
            <View style={singUpStyle.buttonSingUpWithFacebook}>
              <Text style={singUpStyle.buttomGetText}>Log with Facebook</Text>
            </View>
          </TouchableOpacity>
          <Text style={singUpStyle.text}>Forgot Password</Text>
        </View>
      </View>
    </Image>
    );
  }
}
module.exports = SingUpScreen;
