var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

const { width, height } = Dimensions.get('window')

module.exports = StyleSheet.create({
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
  }
});
