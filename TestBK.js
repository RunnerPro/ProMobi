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
    TextInput,
  TouchableHighlight
} from 'react-native';



//var SCREEN_WIDTH = require('Dimensions').get('window').width;
//var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
const { width, height } = Dimensions.get('window')

class TestBK extends Component {
  /*constructor(props) {
    super(props)
    this.state = {
      name : "",
      password: "",
      test:"",
    }
  }

  async onPress() {
    try {
      let response = await fetch("https://runner-pro.herokuapp.com/api/v1.0/records", {
                              method: 'POST',
                              headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json',
                           },
                              body:JSON.stringify ({
                                data:{
                                name: this.state.name,
                                password: this.state.password,
                              }
                             })
                            });
    } catch(errors) {
      }
    }

    async onPress2() {
      try {
        let response = await fetch('https://runner-pro.herokuapp.com/api/v1.0/records');
        let data = await response.text();
        let parseTest = JSON.parse(data);
        this.setState({test: parseTest[18].data});
      }
        catch(errors) {
        }
    }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'rgb(247, 246, 256)'}]}>

        <TextInput

        style = {styles.Account}
         onChangeText={ (text)=> this.setState({name: text}) }
        />
        <TextInput
        style = {styles.Account}
         onChangeText={ (text)=> this.setState({password: text}) }
        />
        <View style ={styles.ViewForButton}>
        <TouchableOpacity onPress = {this.onPress.bind(this)}>
        <View style={styles.buttomGet2}>
          <Text style={styles.buttomGetText}>POST</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPress2.bind(this)}>
        <View style={styles.buttomGet2}>
          <Text style={styles.buttomGetText}>GET</Text>
        </View>
        </TouchableOpacity>
        </View>
        <Text>{this.state.test}</Text>

       </View>
      );
    }
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'flex-start',
    alignItems : 'center',
    padding:10,
    paddingTop: 80,

  },
  buttomGetText: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    paddingTop: 5,
    color: '#fff',
  },
  buttomGet2: {
    height : 50,
    width : width /3,
    marginTop : 20,
    marginLeft : 20,
    backgroundColor: '#FF1493',
  },
  buttomGet: {
    height : 50,
    width : width /3,
    marginTop : 20,
    marginLeft : 20,
    backgroundColor: '#FF1493'
  },
  ViewForButton : {
    flex : 0.2,
    flexDirection : 'row',
  },
  ViewForLogo:{
    flex:1,
  },
  Account:{
    height: 40,
    backgroundColor : '#FFFFFF',
    padding: 4,
    marginTop:10,
  },
}); */

    _TestRegistration(){
      FBLoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
        if (result.isCancelled){
          console.log('Login cancelled');
        }
        else{
          console.log('Login success : ' );
        }

      })

    }

render() {
    return (
      <View style={{  flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding:10,
        paddingTop: 80,
        backgroundColor: '#F5FCFF',}}>
        <TouchableOpacity onPress={this._TestRegistration}>
          <Text>
            Test
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

module.exports = TestBK;
