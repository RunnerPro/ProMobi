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
  TextInput,
  ScrollView

} from 'react-native';

import SingUp from './SingUpScreen'

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window');


class Policy extends Component{
  constructor(props){
    super(props)
    this.stete={
      name : "",
      email : "",
      password : "",
    }
  }

  render(){
    return(
      <Image
        source = {require('./images/Rectangle.png')}
        style = {{width : width, height : height}}>
        <View style = {styles.container}>
          <View style = {styles.navBar}>
            <Text style = {styles.navBarText}> TERMS OF SERVICE & PRIVACY POLICY </Text>
            <View style = {styles.BarForBack}>
              <TouchableOpacity onPress={() => this.props.navigator.replace({id: 1,})}>
                <Image
                source={require('./images/back.png')}
                style ={styles.imgBack}/>
              </TouchableOpacity>
            </View>
              </View>
          <ScrollView style ={{flex :1}}>
          <Text style={{marginHorizontal:width/10, fontFamily : 'Roboto-Medium'}}>Terms of Service </Text>
            <Text style={{marginHorizontal:width/10, fontFamily : 'Roboto-Regular'}}>A privacy policy is a statement or a legal
                  document (in privacy law) that discloses some
                  or all of the ways a party gathers, uses,
                  discloses, and manages a customer or client's
                  data. It fulﬁlls a legal requirement to protect a
                  customer or client's privacy. Personal
                  information can be anything that can be used to
                  identify an individual, not limited to but
                  including name, address, date of birth, marital
                  status, contact information, ID issue and expiry
                  date, ﬁnancial records, credit information,
                  medical history, where one travels, and
                  intentions to acquire goods and services.[1] In
                  the case of a business it is often a statement
                  that declares a party's policy on how it collects,
                  stores, and releases personal information it
                  collects. It informs the client what speciﬁc
                  information is collected, and whether it is kept
                  conﬁdential, shared with partners, or sold to
                  other ﬁrms or enterprises.[2] '</Text>
                  <Text> </Text>
                  <Text style={{fontFamily : 'Roboto-Medium',marginHorizontal:width/10}}>Privacy Policy </Text>
                  <Text style={{marginHorizontal:width/10, fontFamily : 'Roboto-Regular'}}>
                  A privacy policy is a statement or a legal
                  document (in privacy law) that discloses some
                  or all of the ways a party gathers, uses,
                  discloses, and manages a customer or client's
                  data. It fulﬁlls a legal requirement to protect a
                  customer or client's privacy. Personal
                  information can be anything that can be used to
                  identify an individual, not limited to but
                  including name, address, date of birth, marital
                  status, contact information, ID issue and expiry
                  date, ﬁnancial records, credit information,
                  medical history, where one travels, and
                  intentions to acquire goods and services.[1] In
                  the case of a business it is often a statement
                  that declares a party's policy on how it collects,
                  stores, and releases personal information it
                  collects. It informs the client what speciﬁc
                  information is collected, and whether it is kept
                  conﬁdential, shared with partners, or sold to
                  other ﬁrms or enterprises.[2]'</Text>
            </ScrollView>
          </View>
        </Image>
    );
  }
}

const styles = StyleSheet.create({
  navBarText: {
    color: '#000000',
    textAlign: 'center',
    marginTop : 30,
    fontFamily : 'Roboto-Regular'
  },
  navBar: {
    height: 64,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor : 'transparent'

  },
  container: {
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center',
    padding:10,
    paddingTop: 80,


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

module.exports = Policy;
