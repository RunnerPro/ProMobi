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

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window');

var email = ''
var name = ''
var password = ''



class RegistrScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  _handlePressId(Id) {
    this.props.navigator.replace({id: Id,});
  }

async  _onPressGetStart(){
  var self = this ;
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
          console.log(this)
          console.log(self)
          self._handlePressId(2)
      } catch(errors) {
        console.log(errors)
    }
  }
}

_renderTextFild(){
  return(
    <View style ={styles.Account}>
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
          <View style = {styles.container}>
            <View style = {styles.navBar}>
              <Text style = {styles.navBarText}> SING UP</Text>
                <TouchableOpacity onPress={() => this.props.navigator.replace({id: 7,})}>
                  <Image
                    source = {require('./images/policy.png')}
                    style = {styles.imgPolicy}/>
                </TouchableOpacity>
              <View style = {styles.BarForBack}>
                <TouchableOpacity onPress={() => this.props.navigator.replace({id: 1,})}>
                  <Image
                    source={require('./images/back.png')}
                    style ={styles.imgBack}/>
                </TouchableOpacity>
              </View>
            </View>
            {this._renderTextFild()}
            <View style={styles.ViewForButton}>
              <View style={styles.buttonGet}>
                <TouchableOpacity onPress ={this._onPressGetStart} >
                  <View style={styles.buttomGet}>
                    <Text style={styles.buttomGetText}>Get Start</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  BarimgPolicy:{
    height:width/9,
    width:width/9,
    top: -width/13,
    bottom: 0,
    left: width - width/10,
    right: 0,
  },
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
  container: {
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center',
    padding:10,
    paddingTop: 80,
  },
  Account:{
    flex :1,
     height: height/30,
      width: width*8/10,
      backgroundColor : 'transparent',
      padding: 4,
      marginLeft : width/60,

  },
  ViewForButton : {
    flex : 1.5,
    flexDirection : 'row',
  },
  buttomGetText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontFamily : 'Roboto-Regular'
  },
  buttomGet: {

    height : height / 14,
    width: width*8/10,
    //marginTop : ,
    marginLeft : width / 60,
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
  BarForBack :{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position : 'absolute',
    height : 70,
    width : 70,
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
});


module.exports = RegistrScreen;
