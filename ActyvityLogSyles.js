var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

const { width, height } = Dimensions.get('window')

module.exports = StyleSheet.create({

  headerOfList : {
    marginLeft : width/20,
    color : '#979797',
    fontFamily : 'Roboto-Regular',
    marginTop : height*0.01,
    fontSize : 10
  },
  padding : {
    marginLeft : width/20,
    color : '#979797',
    fontFamily : 'Roboto-Regular'
  },
  forView : {
    width :width/6,
    alignItems : 'center',
    marginLeft : width/20,
    flexDirection : 'row'
  },
  textPrefix : {
    fontFamily : 'Roboto-Regular',
    fontSize : 10,
    color : '#979797',
    paddingTop : height*0.007
  },
  textData : {
    fontFamily : 'Roboto-Regular',
    fontSize : 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header:{
    width : width,
    height : height/5,
    backgroundColor : '#F2F5FA',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  progres:{
    width : width,
    position: 'absolute',
    top : height/5
  },
  scrollView:{
    width : width,
    position : 'absolute',
    top : height/5,
    marginTop : 5,
    height : height - height/5
  },
  imgPol : {
    width : width/6,
    height : height/9,
    position : 'absolute',
    top: height*0.06,
    bottom: 0,
    left:  width/2 - width/11,
    right: 0
  },
  textLog : {
    fontFamily: 'Roboto-Regular',
    backgroundColor : 'transparent',
    fontSize : 15,
    marginLeft : width/2.65,
    marginTop : height*0.009
  },
  viewForButtonAndText : {
    flexDirection : 'row',
    backgroundColor : 'transparent',
    width: width,
    height : height*0.05,
    marginTop : height*0.025
  },
  imgBack : {
    left: 0,
    right: 0,
    top: 0,
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
  imgLine : {
    width : width /3,
    left: width / 3.1,
    right: 0,
    top: height/9,
    bottom:0 ,
    position: 'absolute',
  },
  imgLevel : {
    width : width/9,
    height : height /33,
    position : 'absolute',
    left : width /2.3,
    top : height/6.9,
    bottom : 0,
    right : 0,
    borderRadius : 2
  },
  textLevl : {
    backgroundColor : 'transparent',
    fontFamily : 'Roboto-Bold',
    color : '#ffffff',
    fontSize : 10,
    marginTop : height*0.004,
    marginHorizontal : width*0.01
  },
  ptsToNextLevl : {
    backgroundColor : 'transparent',
    marginTop : height/45,
    fontSize : 10 ,
    textAlign : 'center',
    fontFamily : 'Roboto-Regular'
  },
  viewForText : {
    flexDirection : 'row',
    width: width,
    height : height*0.04,
    backgroundColor : 'transparent'
  },
  viewForNomber : {
    flexDirection : 'row',
    width: width,
    height : height*0.04,
    backgroundColor : 'transparent'
  },
  Activities : {
    marginLeft: width/7,
    fontFamily:'Roboto-Regular',
    marginTop : height*0.01,
    color : '#979797'
  },
  Points : {
    marginLeft : width/2.5,
    fontFamily:'Roboto-Regular',
    marginTop : height*0.01,
    color : '#979797'
  },
  nomberActivities : {
    marginLeft:width/6,
    fontFamily: 'Roboto-Medium',
    fontSize : 25,
    marginTop : -height*0.01
  },
  nomberPoints : {
    marginLeft: width/2.2,
    fontFamily: 'Roboto-Medium',
    fontSize : 25,
    marginTop : -height*0.01
  }

});
