import React , {Component} from 'react';
import {
  View,
  Text,
  MapView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window')


class Ditails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cord : [],
      speed : 0,
      dist : 0,
      start : false
    }
  }

  _hendelPressId(Id){
    this.props.navigator.replace({id: Id,});
  }

  _getData(){
    AsyncStorage.getItem('Ditails').then((value) => {
      if(value == null){
        this._getData()
      }else{
        var data = JSON.parse(value)
        for (var i =0 ; i< data.coord.length; i++){
          this.state.cord.push(data.coord[i])
        }
        this.state.speed = data.speed
        this.state.dist = data.distance
        console.log(this.state.cord)
        this.render()

      }
    })
  }

  componentDidMount(){
    //this._getData()
  }
  /*  region={{
      latitude: cord[0].latitude,
      longitude: cord[0].longitude,
      latitudeDelta: cord[3].latitude,
      longitudeDelta : cord[3].longitude
    }}*/

  _renderMap(){
    if (this.state.cord[0] == null){
      if (!this.state.start){
        this._getData()
        this.state.start = true
    }

    }else{
      console.log(this.state.cord[0])
    return(
    <MapView style = {styles.map}
      mapType={'standard'}
      zoomEnable = {true}
      scrollEnabled={true}
      showsScale={true}

     />
   )
 }
}

  render(){
    return (
      <View style= {styles.container}>
        {this._renderMap()}
      </View>
    )
  }
};

const styles = StyleSheet.create({
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
  }
});

module.exports = Ditails ;
