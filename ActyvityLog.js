import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  Alert,
  Image,
  Dimensions,
  ProgressViewIOS
} from 'react-native';


const { width, height } = Dimensions.get('window')

var List = []
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ActyvityLog extends Component{
/*  constructor(){

export default class ActyvityLog extends Component{
  constructor(){

    super()
    this.state = {
      list: '',
      pressed : false
    }
    try {
      AsyncStorage.getItem('database').then((value) => {
        console.log(value)
        this.setState({
          list: JSON.parse(value)
        })
      })
    } catch(err) {
      console.log(err)
    }
  }
  parseData(){
    if ( this.state.list ) {
      return this.state.list.map((data,i) =>  {
        return(<View style={styles.dataList} key = {i}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={styles.score}>Score</Text>
            <TouchableOpacity >
              <Text style={styles.textType}>{data.type}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
            <Text style={styles.textDistance}>{data.distance + ' ml'}</Text>
            <Text style={styles.textTime}>Time</Text>
            <Text style={styles.textSpeed}>Speed</Text>
          </View>
        </View>)
      })
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:12}}>ActyvityLog</Text>
          <TouchableOpacity onPress={() => this.props.navigator.replace({id: 2,})}>
            <Image
              source = {require('./images/back.png')}
              style = {styles.imgBack}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.list}>
                {this.parseData()}
        </ScrollView>
      </View>
    )
  }
}*/
constructor(){
  super()
  this.state = {
      dataSource: ds.cloneWithRows(['rasfd','asdfsadf']),
      dataSpeed : ds.cloneWithRows(['rasfd','asdfsadf']),
      list : '',
      listDist : [],
      listSpeed : [],
      dataArr : [],
      year : '',
      month : ''
      }
    this._renderDitails = this._renderDitails.bind(this);
}


_handlePressId(Id) {
  this.props.navigator.replace({id: Id,});
}

_renderDitails(rowData, rowID){
      AsyncStorage.setItem('Ditails', JSON.stringify(rowData))
  //    this._handlePressId(8)
}

_renderPts(data){
  if (data == null){
    return 0
  }else{
    return data
  }
}

_renderTime(data){
  if (data == null){
    return 0
  }else{
    return data
  }
}

_renderDate(year,mounth){
  if(this.state.month != mounth){
    this.state.month = mounth
    this.state.year = year
    if (mounth == '01'){
      return (
        <Text style = {styles.padding}>January,{year}</Text>
      )
    }
    if (mounth == '02'){
      return (
        <Text style = {styles.padding}>February,{year}</Text>
      )
    }
    if (mounth == '03'){
      return (
        <Text style = {styles.padding}>March,{year}</Text>
      )
    }
    if (mounth == '04'){
      return (
        <Text style = {styles.padding}>April,{year}</Text>
      )
    }
    if (mounth == '05'){
      return (
        <Text style = {styles.padding}>May,{year}</Text>
      )
    }
    if (mounth == '06'){
      return (
        <Text style = {styles.padding}>June,{year}</Text>
      )
    }
    if (mounth == '07'){
      return (
        <Text style = {styles.padding}>July,{year}</Text>
      )
    }
    if (mounth == '08'){
      return (
        <Text style = {styles.padding}>August,{year}</Text>
      )
    }
    if (mounth == '09'){
      return (
        <Text style = {styles.padding}>September,{year}</Text>
      )
    }
    if (mounth == '10'){
      return (
        <Text style = {styles.padding}>October,{year}</Text>
      )
    }
    if (mounth == '11'){
      return (
        <Text style = {styles.padding}>November,{year}</Text>
      )
    }
    if (mounth == '12'){
      return (
        <Text style = {styles.padding}>December,{year}</Text>
      )
    }
  }
  if(this.state.year != year){
    this.state.year = year
    return (
      <Text style = {styles.padding}>{mounth},{year}</Text>
    )
  }
  return
}

_renderRow(rowData: string, sectionID: number, rowID: number,self){
  var year = ''
  var mounth = ''
  var day = ''
  if (rowData.data != null){
    var arr = rowData.data.split('"')
    arr = arr[1].split('-')
    year = arr[0]
    mounth = arr[1]
  }
  return(
    <TouchableOpacity onPress = {() => self._renderDitails(rowData)}>
      {this._renderDate(year,mounth)}
      <View
        style = {{width : width , height : height /20,flexDirection: 'row'}}>
        <View style ={styles.forView}>
          <Text style = {styles.textData}>
            {this._renderPts(rowData.pts)}
          </Text>
          <Text style = {styles.textPrefix}>
            PTS
          </Text>
        </View>
        <View style ={styles.forView}>
          <Text style = {styles.textData}>
            {rowData.distance}
          </Text>
          <Text style = {styles.textPrefix}>
            mi
          </Text>
        </View>
        <View style = {styles.forView}>
          <Text style = {styles.textData}>
            {this._renderTime(rowData.time)}
          </Text>
          <Text style = {styles.textPrefix}>
            SEC
          </Text>
        </View>
        <View style = {styles.forView}>
          <Text style = {styles.textData}>
           {rowData.speed}
          </Text>
          <Text style = {styles.textPrefix}>
            min/mil
          </Text>
        </View>
      </View>
    </TouchableOpacity>
      )
}

_renderListView(){
  var self = this
      return(
        <ListView
          style={styles.scrollView}
          dataSource= {this.state.dataSource}
          renderRow={(data, sectionID,rowID) => this._renderRow(data ,sectionID,rowID , self)}
        />
      )
}

_getList(){
  try {
    AsyncStorage.getItem('database').then((value) => {
      if(value == null){
        this._getList()
      }else{
        List = JSON.parse(value)
        for (var i = 0; i < List.length; i++){
          if(List[i].distance != null){
            var arr = {
              'distance' : parseFloat(List[i].distance).toFixed(2),
              'speed' : parseFloat(List[i].distance).toFixed(2),
              'coord' : List[i].coordinates,
              'time' : List[i].time,
              'pts' : List[i].pts,
              'data' : List[i].data
            }
            this.state.dataArr.push(arr)
          }
          var check = List[i]
          var dis = check[0]
          if(dis != null){
            var arr = {
              'distance' : parseFloat(dis.distance).toFixed(2),
              'speed' : parseFloat(dis.speed[0]).toFixed(2),
              'coord' : dis.coordinates,
              'time' : dis.time,
              'pts' : dis.pts,
              'data' : dis.data
            }
            this.state.dataArr.push(arr)
          }}
          var temp
          for(var i = 0 , j = this.state.dataArr.length-1; i<j; i++,j--)
          {
              temp = this.state.dataArr[j]
              this.state.dataArr[j] = this.state.dataArr[i]
              this.state.dataArr[i] = temp
          }
          this.setState({
            dataSource : ds.cloneWithRows(this.state.dataArr),
        })
        }
    })
  }
  catch(err) {
    console.log(err)
  }

}

componentDidMount() {
  AsyncStorage.removeItem('Ditails');
  this._getList()

}

render() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.viewForButtonAndText}>
        <TouchableOpacity onPress ={() => this._handlePressId(2)}>
          <Image
            source = {require('./images/back.png')}
            style = {styles.imgBack}/>
        </TouchableOpacity>
        <Text style={styles.textLog}>ACTIVITY LOG</Text>
      </View>
        <View style = {styles.viewForText}>
          <Text style = {styles.Activities}>Activities</Text>
          <Text style = {styles.Points}>Points</Text>
        </View>
        <View style = {styles.viewForNomber}>
          <Text style = {styles.nomberActivities}>45</Text>
          <Text style = {styles.nomberPoints}>576</Text>
        </View>
        <Image
          source = {require('./images/Group 4.png')}
          style = {styles.imgLine}/>
        <Image
          source = {require('./images/Group2.png')}
          style = {styles.imgPol}/>
        <Image
          source = {require('./images/Rectangle 4.png')}
          style = {styles.imgLevel}>
            <Text style = {styles.textLevl}>LEVL 2</Text>
        </Image>
        <Text style = {styles.ptsToNextLevl}>233 pts. to Level 3</Text>
      </View>
      <ProgressViewIOS
        style = {styles.progres}
        progressTintColor = '#674DCD'
        progress = {0.5}/>
      {this._renderListView()}
    </View>
  );
}
}

const styles = StyleSheet.create({
  padding : {
    marginLeft : width/20
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
})
