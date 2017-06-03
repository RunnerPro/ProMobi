var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

const { width, height } = Dimensions.get('window')

module.exports = StyleSheet.create({
  TypeOFText: {
   fontSize: 15,
   fontWeight: 'bold',
   textAlign: 'center',
   alignSelf : 'center',
   color: 'white',
   backgroundColor : 'transparent',
   marginTop : 20,
   fontFamily : 'Roboto-Medium'

 },
 TypeOFText2: {
   fontFamily : 'Roboto-Regular',
   fontSize: 15,
   fontWeight: 'bold',
   textAlign: 'center',
   alignSelf : 'center',
   color: 'white',
   backgroundColor : 'transparent',
   marginTop : 30,

 },
  BarForBurger :{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position : 'absolute',
    height : 70,
    width : 70,
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  imgClose:{
    left: 0,
    right: 0,
    top: 15,
    bottom:0 ,
    position: 'absolute',
    height: 50,
    width: 50,
  },
  img2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: null,
    width: null,
    opacity : 0.95,
  },
  navBar2: {
   backgroundColor: 'transparent',
   height: 64,
   width: width,
   position: 'absolute',
   top: 0,
   bottom: 0,
   left: 0,
   right: 0,
 },
  touchStop : {
    height : height/10,
    width : width /50,
  },
  touchPlay : {
    height : height /100,
  },
  bpm : {
    fontFamily: 'Roboto-Medium',
    backgroundColor : 'transparent',
    fontSize : 10,
    color: '#979797',
    marginTop : height /60,
  },
  NomberBPM : {
    backgroundColor : 'transparent',
    fontFamily : 'Roboto-Medium',
    fontSize : 20,
    color : '#000000',
  },
  TextBPM : {
    backgroundColor : 'transparent',
    fontFamily : 'Roboto-Regular',
    fontSize : 10,
    color : '#979797',
    paddingLeft : width *3/4,
    marginTop : -height/10
  },
  btStop : {
    width : width/8,
    height : width /8,
    position : 'absolute',
    top: -height*0.02,
    bottom: 0,
    left:  -width*0.3,
    right: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }

  },
  btPlay : {
    width : width/5,
    height : width /5,
    position : 'absolute',
    top: -height*0.14,
    bottom: 0,
    left:  -width*0.09,
    right: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }

  },
  TextTime : {
    backgroundColor : 'transparent',
    fontFamily : 'Roboto-Regular',
    color : '#7002FF',
    fontSize : 40,
    textAlign : 'center',
  },
  TextMiles : {
    backgroundColor : 'transparent',
    marginLeft: width*0.46,
    marginTop : -height /70,
    fontSize : 20,
    fontFamily : 'Roboto-Medium',
    color : '#D8D8D8'
  },
  NomberOfMiles : {
    backgroundColor : 'transparent',
    color : '#000000',
    fontFamily : 'Roboto-Medium',
    marginTop : height*0.273,
    textAlign : 'center',
    fontSize : 40
  },
  TextFactor : {
    backgroundColor : 'transparent',
    color : '#ffffff',
    fontSize : 14,
    marginTop : height / 110,
    marginHorizontal : -width/90

  },
  TextX : {
    backgroundColor : 'transparent',
    color : '#ffffff',
    fontFamily : 'Roboto-Bold',
    fontSize : 10,
    marginTop : height / 80,
    marginHorizontal : width/60,
  },
  TextPTS : {
    backgroundColor : 'transparent',
    fontFamily : 'Roboto-Medium',
    textAlign : 'center',
    color : '#ffffff',
    marginTop : - height/100,
  },
  TextNomberPTS : {
    backgroundColor : 'transparent',
    fontFamily : 'Roboto-Medium',
    textAlign : 'center',
    color : '#ffffff',
    marginTop : height/30,
    fontSize : 35
  },
  imageXPTS :{
    width : width / 12,
    height : width/12,
    position : 'absolute',
    top: height*2 /13,
    bottom: 0,
    left:  width*3/11 + 2,
    right: 0,

  },
  TextNomberAVG:{
    borderColor : '#979797',
    fontFamily: 'Roboto-Medium',
    backgroundColor : 'transparent',
    fontSize : 20,
    marginTop : - height/130
  },
  TextAVG : {
    fontSize : 10,
    color : '#979797',
    marginTop : height/7,
    backgroundColor : 'transparent',
    fontFamily: 'Roboto-Regular',
    marginLeft : width*0.49,
  },
  TextNomberColories:{
    borderColor : '#979797',
    fontFamily: 'Roboto-Medium',
    backgroundColor : 'transparent',
    marginHorizontal: width/25,
    marginTop : - height/130,
    fontSize : 20,

  },
  TextColories:{
    fontFamily: 'Roboto-Medium',
    backgroundColor : 'transparent',
    marginLeft:-width/25,
    marginTop : height /300,
    fontSize : 10,
    color: '#979797',

  },
  TextActivityColories:{
    fontSize: 10,
    color : '#979797',
    marginHorizontal : width/25,
    marginTop : height/7,
    backgroundColor : 'transparent',
    fontFamily: 'Roboto-Regular',

  },
  imgHamburger:{
    width: width/12,
    height : height/12,
    position: 'absolute',
    top: height / 150,
    bottom: 0,
    left:  width/100,
    right: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  TouchHamburger:{
    width: width/40,
    height : height/30,
    position: 'absolute',
    top: height / 40,
    bottom: 0,
    left:  width/35,
    right: 0,
  },
  imgPolygon:{
    width: width*2/8,
    height : height*2/13,
    position: 'absolute',
    top: height/40,
    bottom: 0,
    left:  width/5,
    right: 0,
  },
  TouchPolygon:{
    width: width/10,
    height : height*2/15,
    position: 'absolute',
    top: height/40,
    bottom: 0,
    left:  width*2/11,
    right: 0,

  },
  bottomBar: {
      position: 'absolute',
      height: height*2/3,
      bottom: 0,
      width: width,
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingTop:height/15,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navBar: {
    height: height/2,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
