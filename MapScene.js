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
  ScrollView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';


import pick from 'lodash.pick'
import haversine from 'haversine'
import FBSDK , {LoginManager,AccessToken,FBGraphRequest,LoginButton} from 'react-native-fbsdk';



var SCREEN_WIDTH = require('Dimensions').get('window').width
var BaseConfig = Navigator.SceneConfigs.FloatFromRight
const { width, height } = Dimensions.get('window')

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});
const speedlist=[];

class PageTwo extends Component {
constructor(props) {
  super(props)
  this.state = {
    routeCoordinates: [],
    distanceTravelled: 0,
    calcDistanceButton: false,
    prevLatLng: {},
    playPress : false,
    stopPress : true,
    speed : 0,
    actyv : false,
    TypeOF : 'REGULAR CARDIO',
    PressBurger : false,
    firstlatitude: 0,
    firstlongitude : 0,
    lastlatitude : 0,
    lastlongitude : 0,
    pressStop : 0,
    coord : [],
    Milsec : 0,
    Milsec2 : 0,
    Sec : 0,
    Sec2 : 0,
    min2 : 0,
    min : 0,
    check : false,
    TimeTraning : 0,
    i : 0,
    pts : 0
  }
  this._timer = this._timer.bind(this);
  this._timeTraning = this._timeTraning.bind(this);
}
_onChangePlay(){

  if(this.state.playPress){
    this.setState({
      prevLatLng : {},
    })
  }
  if(this.state.pressStop == 1 ){
    this.setState({
        routeCoordinates:[],
        coord : [],
    })
  }
  this.setState({
    playPress : !this.state.playPress,
    stopPress : false,
    pressStop : 0,
  })


  if (!this.state.check ){
    this.state.check = true;
    this._timer();
    this._timeTraning();
  }
}


async onPress(arrayDataAndTime, arrayDistance) {
  console.log(arrayDataAndTime)
  console.log(JSON.stringify(arrayDistance))


  try {
    let response = await fetch("https://runner-pro.herokuapp.com/api/recordstest", {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                         },
                            body:JSON.stringify ({
                              data:{
                                coordinates: arrayDistance
                              },
                           })
                          });
                          let res = response.text()
                          console.log(res)
                          console.log(response)
  } catch(errors) {
    console.log(errors)
    }
  }
_onPresStop(){
  this.setState ({
    TimeTraning : 0,
    check : false,
    Milsec : 0,
    Sec : 0,
    min : 0,
    Milsec2 : 0,
    Sec2 : 0,
    min2 : 0,

  })
 const arrayDataAndTime=[];
 const arrayDistance=[];
 const data={
   type:this.state.TypeOF,
   time: JSON.stringify(new Date),
 }
 const dis={
   coordinates: this.state.coord,
   speed:speedlist,
 }


 arrayDataAndTime.push(data);
 arrayDistance.push(dis);
  this.onPress(arrayDataAndTime,arrayDistance);

  this.setState({
    stopPress : true,
    playPress : false,
    distanceTravelled: 0,
    prevLatLng: {},
    pressStop : 1,
  })
  AsyncStorage.getItem('database').then((value)=>{
                                       if(value !== null){
                                       const d=JSON.parse(value);
                                       d.push(dis)
                                       AsyncStorage.setItem('database',JSON.stringify(d))
                                       }
                                       else{
                                       AsyncStorage.setItem('database',JSON.stringify(dis))
                                     }
                                       })
                  AsyncStorage.getItem('database').then((value) => {
                  })
}

 _onPressPlayButton(){
   if(!this.state.playPress){
   return (
     <Image
       source = {require('./images/_btn_play_2.png')}
       style = {styles.btPlay}/>
   );
 }else{
   return (
     <Image
     style={styles.btPlay}
     source={require('./images/_btn_pause_4.png')}/>
   );
 }
 }

 _onRenderStop(){
   if(!this.state.stopPress){
     return(
       <Image
       source = {require('./images/btStop.png')}
       style = {styles.btStop}/>
     );
   }
 }





  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000, distanceFilter: 10}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates, distanceTravelled , speed, coord } = this.state
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      this.setState({
      speed : position.coords.speed,
      });
      if (!this.state.stopPress){
      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
      });
    }
  if (this.state.playPress){
      coord.push(newLatLngs)
      speedlist.push(position.coords.speed)
      this.setState({
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
        prevLatLng: newLatLngs,
        lastlatitude : position.coords.latitude,
        lastlongitude : position.coords.longitude,
      })
}
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 1000, maximumAge: 0, distanceFilter: 5}
  );

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0)
  }
_changeSelection(feed) {
    this.setState({ myChatsSelected: feed === 'my' });
    this.props.onChange(feed);
  }

  _CangeACtivState(){
    if (this.state.stopPress)
    this.setState({
      actyv : true,
    })
  }

_onSelectACTYVITYLOG(){
  this.props.navigator.replace({id: 3,});
  this.setState({PressBurger : false});
}

_onSeclectLOGOUT(){
  this.state.check = false;
  AsyncStorage.removeItem('databaseTOKEN');
  LoginManager.logOut();
  this.props.navigator.replace({id:1,});
  this.setState({PressBurger :false});
}

_onSeclectSCREENLAYOUT(){
  this.props.navigator.replace({id:6,});
  this.setState({PressBurger :false});
}

_renderBurger(){
  if(this.state.PressBurger){
    return(
      <Image
        source={require('./images/bg.png')}
        style={styles.img2}>
          <View style = {styles.container3}>
            <View style={styles.navBar2}>
              <Text style ={styles.TypeOFText2}> RUNNER PRO</Text>
                <View style ={styles.BarForBurger}>
                  <TouchableOpacity onPress={() => this.setState({PressBurger : false})}>
                    <Image
                    source={require('./images/_close_white.png')}
                    style ={styles.imgClose}/>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity  >
                <Text style = {styles.TypeOFText}>ACCOUNT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onSelectACTYVITYLOG()} >
                <Text style = {styles.TypeOFText}>ACTYVITY LOG</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style = {styles.TypeOFText}>SCREEN LAYOUT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onSeclectLOGOUT()} >
                <Text style = {styles.TypeOFText}>LOG OUT</Text>
              </TouchableOpacity>

          </View>
        </Image>
      );
    }
  }

_onRenderMapView(){
  if(this.state.pressStop == 1 && this.state.coord[0] != null ){
    return(
      <MapView
        style={styles.map}
        mapType={'standard'}
        showsUserLocation={true}
        zoomEnable = {true}
        scrollEnabled={true}
        showsScale={true}
        region={{
          latitude: this.state.coord[0].latitude,
          longitude: this.state.coord[0].longitude,
          latitudeDelta: Math.abs(this.state.lastlatitude - this.state.coord[0].latitude)*3,
          longitudeDelta : Math.abs(this.state.lastlongitude - this.state.coord[0].longitude)*3,
        }}
        overlays={[{
          coordinates: this.state.routeCoordinates,
          strokeColor: '#7B88F7',
          lineWidth: 9,
        }]} />

    );
  }else{
  return(  <MapView
      style={styles.map}
      mapType={'standard'}
      showsUserLocation={true}
      followUserLocation={true}
      zoomEnable = {true}
      scrollEnabled={true}
      showsScale={true}
      overlays={[{
        coordinates: this.state.routeCoordinates,
        strokeColor: '#460D80',
        lineWidth: 9,
      }]} />
    );
  }
}

 _timeTraning () {
   var self =this;
   if ( this.state.check){
       this.setState ({
         TimeTraning : this.state.TimeTraning + 1
       })
       setTimeout(function () {
         return (self._timeTraning())
       }, 1000);
     }
 }
 _timer (){
   var self = this;
   if(this.state.check){
     if (this.state.Milsec2 > 8){
       this.setState({
         Milsec2 : -1 ,
         Sec : this.state.Sec + 1
       })
     }
     if (this.state.Sec > 9){
       this.setState({
         Sec : 0 ,
         Sec2 : this.state.Sec2 + 1
       })
     }
     if (this.state.Sec2 > 5){
       this.setState({
         Sec2 : 0 ,
         min : this.state.min + 1
       })
     }
     if (this.state.Sec2 > 9){
       this.setState({
         min : 0 ,
         min2 : this.state.min + 1
       })
     }
       this.setState({
         Milsec2 : this.state.Milsec2 + 1
       });
      setTimeout(function () {
        return (self._timer())
      }, 10);
    }
 }

_RenderBonus (){
 if (this.state.TimeTraning > 30){
  return (
    <Image
      source = {require('./images/XImage.png')}
      style = {styles.imageXPTS}>
      <View style ={{flexDirection : 'row'}}>
        <Text style = {styles.TextX}>X</Text>
        <Text style = {styles.TextFactor}>2</Text>
      </View>
    </Image>
  );
}
}

_pts(){

 var pts = parseFloat(this.state.distanceTravelled*10).toFixed(0);
 var pts1 = 0;
 var pts2 = 0;
 if (this.state.TimeTraning > 30){
   pts1 = pts1 +pts*2;
     if (this.state.TimeTraning > 60)
     {
        pts1 = pts1 + 100;
     }
     if (this.state.TimeTraning > 90)
     {
        pts1 = pts1 + 200;
     }
 }
 if (this.state.TimeTraning/this.state.i > 30 ){
   this.state.i = this.state.i + 1;
   this.state.pts = pts1;
   return pts1;
 }else  return this.state.pts;


}

render() {
    return (
      <View style={styles.container}>
        {this._onRenderMapView()}
          <View style={styles.navBar}>
              <Image
                source={require('./images/RectangleTop.png')}
                style = {{width:width,height : height/6}}>
                <View style = {{flexDirection : 'row'}}>
                    <Text style={styles.TextActivityColories}>Active Calories</Text>
                    <Text style = {styles.TextAVG}>Avg.min/miles</Text>
                  </View>
              </Image>
              <Image
                source={require('./images/RectangleTop2.png')}
                style = {{width:width, height : height/3}}>
                <View style = {{ flexDirection: 'row'}}>
                  <View style = {{width : width /3}}>
                    <Text style = {styles.TextNomberColories}>{parseFloat(this.state.distanceTravelled*100/1.6).toFixed(2)}</Text>
                    <Text style = {styles.TextColories}>kcal</Text>
                  </View>
                  <View style ={{width:width/4, marginLeft : width*0.4}}>
                    <Text style = {styles.TextNomberAVG}>{parseFloat(this.state.speed).toFixed(2)}</Text>
                  </View>
                </View>

              </Image>
              <TouchableOpacity style={styles.TouchPolygon}>
                <Image
                  source ={require('./images/Polygon.png')}
                  style = {styles.imgPolygon}>
                  <Text style = {styles.TextNomberPTS}>{this._pts()}</Text>
                  <Text style = {styles.TextPTS}>pts</Text>
                </Image>
                {this._RenderBonus()}
            </TouchableOpacity>
            <TouchableOpacity style={styles.TouchHamburger} onPress={() => this.setState({PressBurger : true})}>
              <Image
                source ={require('./images/hamburger.png')}
                style = {styles.imgHamburger}
                />
            </TouchableOpacity>
            </View>
            <View style={styles.bottomBar}>
            <Image
              source = {require('./images/ReactangleBottom2.png')}
              style = {{width:width,height : height*0.372}}>
              <Text style = {styles.NomberOfMiles}>{parseFloat(this.state.distanceTravelled/1.6).toFixed(2)}</Text>
              <Text style = {styles.TextMiles}>MILE</Text>
            </Image>
              <Image
                source = {require('./images/RectangleBottom.png')}
                style = {{width: width,
                          height : height*2/8,
                          top : height }}>
                  <Text style = {styles.TextTime}>{this.state.min2}{this.state.min}:{this.state.Sec2}{this.state.Sec}.{this.state.Milsec2}</Text>
                  <TouchableOpacity style = {styles.touchPlay} onPress={() => this._onChangePlay()}>
                    {this._onPressPlayButton()}
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.touchStop} onPress = {() => this._onPresStop()}>
                    {this._onRenderStop()}
                  </TouchableOpacity>
                  <Text style = {styles.TextBPM}>Heart rate</Text>
                  <View style = {{flexDirection : 'row',width : width /5, marginLeft:width*0.75}}>
                    <Text style = {styles.NomberBPM} >107</Text>
                    <Text style = {styles.bpm}>bpm</Text>
                  </View>
              </Image>
            </View>
             {this._renderBurger()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
    top: height /50,
    bottom: 0,
    left:  width/7,
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
    top: height /100,
    bottom: 0,
    left:  width*4/10,
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


module.exports = PageTwo;
