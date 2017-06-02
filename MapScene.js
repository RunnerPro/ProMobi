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
  AsyncStorage,
  AppState
} from 'react-native';

import mapStyles from './MapStyles'
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
var token = [];

class PageTwo extends Component {
  constructor(props) {
    super(props);
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
      check : false,
      TimeTraning : {
        'min' : 0,
        'sec' : 0
      },
      i : 0,
      pts : 0,
      startTracking : false,
      startCheck : false,
      startTimer : 0,
      JoggingTime : 0,
      k : 1,
      puseTimer : false,
      auxiliaryDate : 0,
      delta : 0
    }
    this._timeTraning = this._timeTraning.bind(this);
    this._stopAll = this._stopAll.bind(this);
  }

  _getToken(){
    AsyncStorage.getItem('databaseTOKEN').then((value)=>{
      if (value == null){
        this._getToken()
      }else {
         var token = JSON.parse(value)
          token = token._65.token
          this.setState({
            Token : token
          })
        }
        })
  }

  _onChangePlay(){
    if(this.state.playPress){
      this.setState({
        prevLatLng : {},
      })
      this.state.auxiliaryDate = new Date
    }
    if (!this.state.playPress && this.state.auxiliaryDate != 0){
      timeOnStart = new Date
      console.log( timeOnStart.getTime() - this.state.auxiliaryDate.getTime() + this.state.delta)
      this.state.delta = timeOnStart.getTime() - this.state.auxiliaryDate.getTime() + this.state.delta
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
      startCheck : !this.state.startCheck,
    })
    if (this.state.startTimer != 0){
      this.state.puseTimer = !this.state.puseTimer
      this._timeTraning(this.state.startTimer);
    }
    if (!this.state.check ){
      this.state.check = true;
      this.state.puseTimer = true
      this.state.startTimer = new Date
      this.state.startTimer = this.state.startTimer.getTime()
      this._timeTraning(this.state.startTimer);
    }
  }

  async onPress(arrayDataAndTime, arrayDistance) {
    AsyncStorage.getItem('database').then((value) => {
      console.log(JSON.parse(value))
    })
    try {
      let response = await fetch("https://runner-pro.herokuapp.com/api/new_record", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : `${this.state.Token}`,
        },
        body:JSON.stringify ({
            time: arrayDataAndTime,
            coordinates : arrayDistance,
        })
      });
      console.log(response)
      let res = response.text()
      console.log(res)

    } catch(errors) {
      console.log(errors)
    }
  }

  _stopAll(){
    this.setState ({
      TimeTraning :{
        'min' : 0,
        'sec' : 0
      },
      check : false,
      startCheck : false ,
      JoggingTime : 0,
      delta : 0,
      auxiliaryDate : 0
    })
    this.setState({
      stopPress : true,
      playPress : false,
      distanceTravelled: 0,
      prevLatLng: {},
      pressStop : 1,
    })
  }

  _onPresStop(){
    this._stopAll()
    const arrayDataAndTime=[];
    const arrayDistance=[];
    const data = {
      type: this.state.TypeOF,
      time: new Date,
    }

    var date = new Date
    var day = date.getDay()
    var Data = date.getDate()
    var mounth = date.getMonth()
    var year = date.getFullYear()

    const dis = {
      coordinates: this.state.coord,
      speed: speedlist,
      distance: this.state.distanceTravelled,
      day : day,
      data : Data,
      month : mounth,
      year : year,
      time : this.state.TimeTraning,
      pts : this.state.pts
    }
    this.state.startTracking = false;
    arrayDataAndTime.push(data);
    arrayDistance.push(dis);
    this.onPress(arrayDataAndTime,arrayDistance);

    AsyncStorage.getItem('database').then((value) => {
      if (value !== null) {
        const d = JSON.parse(value);
        d.push([dis])
        AsyncStorage.setItem('database', JSON.stringify(d))
      } else {
        AsyncStorage.setItem('database', JSON.stringify([dis]))
      }
    })
    AsyncStorage.getItem('database').then((value) => {})
  }

  _onPressPlayButton(){
      return (
        <Image source = {this.state.playPress ?  require('./images/_btn_pause_4.png') : require('./images/_btn_play_2.png')}
        style = {mapStyles.btPlay}/>);
  }

  _onRenderStop() {
    if(!this.state.stopPress && !this.state.startCheck){
      return(
        <Image source = {require('./images/btStop.png')}
          style = {mapStyles.btStop}/>
      );
    }
  }

  _handlePressId(Id) {
    this._stopAll()
    navigator.geolocation.clearWatch(this.watchID);
    this.props.navigator.replace({id: Id,});
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {},
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000, distanceFilter: 10}
    )
     this.doWatch()
     this._getToken()
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    navigator.geolocation.clearWatch(this.watchID);
  }

  doWatch(){
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const { routeCoordinates, distanceTravelled , speed, coord } = this.state
          const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
          const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])

          if (!this.state.stopPress){
            this.setState({
              routeCoordinates: routeCoordinates.concat(positionLatLngs),
            });
            this.setState({
              speed : position.coords.speed,
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

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState != 'active' && this.state.stopPress) {
      navigator.geolocation.clearWatch(this.watchID);
      this.watchID = null;
    } else {
      if (this.watchID === null) {
        this.doWatch();
      }
    }
  }


  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0)
  }

  _changeSelection(feed) {
    this.setState({ myChatsSelected: feed === 'my' });
    this.props.onChange(feed);
  }

  _CangeACtivState() {
    if (this.state.stopPress)
    this.setState({
      actyv : true,
    })
  }

  _onSelectACTYVITYLOG(){
    this._handlePressId(3);
    this.setState({PressBurger : false});
  }

  _onSeclectLOGOUT(){
    this.state.check = false;
    AsyncStorage.removeItem('databaseTOKEN');
    LoginManager.logOut();
    this.setState({PressBurger :false});
    this._handlePressId(1);

  }

  _onSeclectSCREENLAYOUT(){
    this.setState({PressBurger :false});
    this._handlePressId(6);

  }

  _renderBurger(){
    if(this.state.PressBurger){
      return(
        <Image
          source={require('./images/bg.png')}
          style={mapStyles.img2}>
            <View style = {mapStyles.container3}>
              <View style={mapStyles.navBar2}>
                <Text style ={mapStyles.TypeOFText2}> RUNNER PRO</Text>
                <View style ={mapStyles.BarForBurger}>
                  <TouchableOpacity onPress={() => this.setState({PressBurger : false})}>
                    <Image
                      source={require('./images/_close_white.png')}
                      style ={mapStyles.imgClose}/>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity>
                <Text style = {mapStyles.TypeOFText}>ACCOUNT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onSelectACTYVITYLOG()} >
                <Text style = {mapStyles.TypeOFText}>ACTYVITY LOG</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style = {mapStyles.TypeOFText}>SCREEN LAYOUT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onSeclectLOGOUT()} >
                <Text style = {mapStyles.TypeOFText}>LOG OUT</Text>
              </TouchableOpacity>
          </View>
        </Image>
      );
    }
  }

  _onRenderMapView(){
    if(this.state.pressStop == 1 && this.state.coord[0] != null ) {
      return (
        <MapView
        style={mapStyles.map}
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
    } else {
      return ( <MapView
        style={mapStyles.map}
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

  _timeTraning(timer) {
    Timer = timer
    var self =this;
    if (this.state.check && this.state.puseTimer){
       var IntermediateTime = new Date
       var JoggingTime = new Date(IntermediateTime.getTime() - timer - this.state.delta)
       this.setState ({
         TimeTraning : {
          'sec' : JoggingTime.getUTCSeconds(),
          'min' : JoggingTime.getUTCMinutes()
         }
       })
       setTimeout(function () {
         return (self._timeTraning(Timer))
       }, 1000);
     }
  }

  _RenderBonus (){
    if (this.state.TimeTraning.sec + this.state.TimeTraning.min*60 > 30){
      return (
        <Image
          source = {require('./images/XImage.png')}
          style = {mapStyles.imageXPTS}>
          <View style ={{flexDirection : 'row'}}>
             <Text style = {mapStyles.TextX}>X</Text>
            <Text style = {mapStyles.TextFactor}>2</Text>
          </View>
        </Image>
      );
    }
  }

  _renderTime(){
    var formattedNumber = ("0" +this.state.TimeTraning.min).slice(-2)
    var formatSec = ("0" +this.state.TimeTraning.sec).slice(-2)
    return (
      <Text style = {mapStyles.TextTime}>{formattedNumber}:{formatSec}</Text>
    )
  }

  _pts() {
   var pts = parseFloat(this.state.distanceTravelled*10).toFixed(0);
   var pts1 = 0;
   var pts2 = 0;
   if (this.state.TimeTraning.sec + this.state.TimeTraning.min*60 > 30){
     pts1 = pts1 +pts*2;
     if (this.state.TimeTraning.sec + this.state.TimeTraning.min*60 > 60) {
       pts1 = pts1 + 100;
     }
     if (this.state.TimeTraning.sec + this.state.TimeTraning.min*60 > 90) {
       pts1 = pts1 + 200;
     }
   }
   if ((this.state.TimeTraning.sec + this.state.TimeTraning.min*60)/this.state.i > 30 ){
     this.state.i = this.state.i + 1;
     this.state.pts = pts1;
     return pts1;
   } else  return this.state.pts;
 }
  render() {
    return (
      <View style={mapStyles.container}>
        {this._onRenderMapView()}
          <View style={mapStyles.navBar}>
              <Image
                source={require('./images/RectangleTop.png')}
                style = {{width:width,height : height/6}}>
                <View style = {{flexDirection : 'row'}}>
                    <Text style={mapStyles.TextActivityColories}>Active Calories</Text>
                    <Text style = {mapStyles.TextAVG}>Avg.min/miles</Text>
                  </View>
              </Image>
              <Image
                source={require('./images/RectangleTop2.png')}
                style = {{width:width, height : height/3}}>
                <View style = {{ flexDirection: 'row'}}>
                  <View style = {{width : width /3}}>
                    <Text style = {mapStyles.TextNomberColories}>{parseFloat(this.state.distanceTravelled*100/1.6).toFixed(2)}</Text>
                    <Text style = {mapStyles.TextColories}>kcal</Text>
                  </View>
                  <View style ={{width:width/4, marginLeft : width*0.4}}>
                    <Text style = {mapStyles.TextNomberAVG}>{parseFloat(this.state.speed).toFixed(2)}</Text>
                  </View>
                </View>

              </Image>
              <TouchableOpacity style={mapStyles.TouchPolygon} onPress ={() =>  this._handlePressId(3)}>
                <Image
                  source ={require('./images/Polygon.png')}
                  style = {mapStyles.imgPolygon}>
                  <Text style = {mapStyles.TextNomberPTS}>{this._pts()}</Text>
                  <Text style = {mapStyles.TextPTS}>pts</Text>
                </Image>
                {this._RenderBonus()}
            </TouchableOpacity>
            <TouchableOpacity style={mapStyles.TouchHamburger} onPress={() => this.setState({PressBurger : true})}>
              <Image
                source ={require('./images/hamburger.png')}
                style = {mapStyles.imgHamburger}
                />
            </TouchableOpacity>
            </View>
            <View style={mapStyles.bottomBar}>
            <Image
              source = {require('./images/ReactangleBottom2.png')}
              style = {{width:width,height : height*0.372}}>
              <Text style = {mapStyles.NomberOfMiles}>{parseFloat(this.state.distanceTravelled/1.6).toFixed(2)}</Text>
              <Text style = {mapStyles.TextMiles}>MILE</Text>
            </Image>
              <Image
                source = {require('./images/RectangleBottom.png')}
                style = {{width: width,
                          height : height*2/8,
                          top : height }}>
                  {this._renderTime()}
                  <TouchableOpacity style = {mapStyles.touchPlay} onPress={() => this._onChangePlay()}>
                    {this._onPressPlayButton()}
                  </TouchableOpacity>
                  <TouchableOpacity style = {mapStyles.touchStop} onPress = {() => this._onPresStop()}>
                    {this._onRenderStop()}
                  </TouchableOpacity>
                  <Text style = {mapStyles.TextBPM}>Heart rate</Text>
                  <View style = {{flexDirection : 'row',width : width /5, marginLeft:width*0.75}}>
                    <Text style = {mapStyles.NomberBPM} >107</Text>
                    <Text style = {mapStyles.bpm}>bpm</Text>
                  </View>
              </Image>
            </View>
             {this._renderBurger()}
      </View>
    );
  }
};

module.exports = PageTwo;
