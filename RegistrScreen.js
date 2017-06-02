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
  AppRegistry,
  ScrollView,
  TextInput,
  AsyncStorage
} from 'react-native';

import TextField from 'react-native-md-textinput';
import registrScreenStyle from './RegistrScreenStyle'

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window');

var email = ''
var name = ''
var password = ''



class RegistrScreen extends Component{
  constructor(props) {
    super(props)
  }

  _handlePressId(Id) {
    this.props.navigator.replace({id: Id,});
  }

async  _onPressGetStart(self){
  if (name != '' && password != '' && email != ''){
      try {
        let response = await fetch("https://runner-pro.herokuapp.com/api/users", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify ({
            username : name,
            email : email,
            password : password,
            })
        });
        let res = response.json()
        console.log(res)
        AsyncStorage.getItem('databaseTOKEN').then((value)=>{
          if(value == null){
            AsyncStorage.setItem('databaseTOKEN',JSON.stringify(res));
            }
          })
          self.props.navigator.replace({id: 2,})
      } catch(errors) {
        console.log(errors)
    }
  }
}

_renderTextFild(){
  return(
    <View style ={registrScreenStyle.Account}>
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
        }} />
      <TextField
        label={'Email'}
        highlightColor={'#460D80'}
        textFocusColor={'#460D80'}
        textBlurColor={'#460D80'}
        onChangeText={(text) => {
          email = text;
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
    )
  }
  render(){
    return(
      <Image
        source = {require('./images/Rectangle.png')}
        style = {{width : width}}>
          <View style = {registrScreenStyle.container}>
            <View style = {registrScreenStyle.navBar}>
              <Text style = {registrScreenStyle.navBarText}> SING UP</Text>
                <TouchableOpacity onPress={() => this.props.navigator.replace({id: 7,})}>
                  <Image
                    source = {require('./images/policy.png')}
                    style = {registrScreenStyle.imgPolicy}/>
                </TouchableOpacity>
              <View style = {registrScreenStyle.BarForBack}>
                <TouchableOpacity onPress={() => this.props.navigator.replace({id: 1,})}>
                  <Image
                    source={require('./images/back.png')}
                    style ={registrScreenStyle.imgBack}/>
                </TouchableOpacity>
              </View>
            </View>
            {this._renderTextFild()}
            <View style={registrScreenStyle.ViewForButton}>
              <View style={registrScreenStyle.buttonGet}>
                <TouchableOpacity onPress ={() => this._onPressGetStart(this)} >
                  <View style={registrScreenStyle.buttomGet}>
                    <Text style={registrScreenStyle.buttomGetText}>Get Start</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </Image>
    );
  }
}

module.exports = RegistrScreen;
