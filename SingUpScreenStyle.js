var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

const { width, height } = Dimensions.get('window')

module.exports = StyleSheet.create({
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
    fontSize: width*0.04,
    textAlign: 'center',
    margin: width*0.037,
    color: '#fff',
    fontFamily : 'Roboto-Regular'
  },
  buttomGet: {
    height : height / 14,
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
    height : height/14,
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
