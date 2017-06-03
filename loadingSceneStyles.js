var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

const { width, height } = Dimensions.get('window')

module.exports = StyleSheet.create({
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
    fontSize : width*0.04
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
    fontSize: width*0.07,
    textAlign: 'center',
    margin: 10,
    color: '#460D80',
    marginTop : width/2,
    fontFamily : 'Roboto-Light'
  },
  buttomGetText: {
    fontFamily: 'Helvetica',
    fontSize: width*0.04,
    textAlign: 'center',
    margin: width*0.025,
    color: '#fff',
    fontFamily : 'Roboto-Regular',

  },
  buttonSingUpWithEmail: {
    height: height/12,
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
    height: height/12,
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
