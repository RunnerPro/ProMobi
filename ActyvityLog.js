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

import stylesActyvityLog from './ActyvityLogSyles'

var List = []
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ActyvityLog extends Component{
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
      month : '',
      supprot : ''
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
  if(data != null){
    if (data.sec <= 9 && data.min <= 9){
      return(
        <Text style = {stylesActyvityLog.textData}>0{data.min}:0{data.sec}</Text>
      )
    }
    if(data.sec <= 9 && data.min > 9){
      return(
        <Text style = {stylesActyvityLog.textData}>{data.min}:0{data.sec}</Text>
      )
    }
    if(data.sec > 9 && data.min <= 9){
      return(
        <Text style = {stylesActyvityLog.textData}>0{data.min}:{data.sec}</Text>
      )
    }
    if(data.sec > 9 && data.min > 9){
      return(
        <Text style = {stylesActyvityLog.textData}>{data.min}:{data.sec}</Text>
      )
    }
  }
}

_renderDate(year,mounth){
  todayDate = new Date
  currentMonth = todayDate.getMonth()
    switch(mounth){
      case 0 :
        monthName = "January";
        break;
      case 1 :
        monthName = "February";
        break;
      case 2 :
        monthName = "March";
        break;
      case 3 :
        monthName = "April";
        break;
      case 4 :
        monthName = "May";
        break;
      case 5 :
        monthName = "June";
        break;
      case 6 :
        monthName = "July";
        break;
      case 7 :
        monthName = "August";
        break;
      case 8 :
        monthName = "September";
        break;
      case 9 :
        monthName = "October";
        break;
      case 10 :
        monthName = "November";
        break;
      case 11 :
        monthName = "December";
        break;
      default:
        monthName = "other"
    }
    this.state.mounth = monthName
    if (currentMonth == mounth && this.state.mounth != "other" && this.state.mounth != this.state.supprot){
      this.state.supprot = this.state.mounth
      return(
        <Text style = {stylesActyvityLog.padding}>THIS MONTH</Text>
      )
    }else {
    if (this.state.mounth != "other" && this.state.mounth != this.state.supprot){
      this.state.supprot = this.state.mounth
        return (
          <Text style = {stylesActyvityLog.padding}>{monthName},{year}</Text>
      )
    }
  }
}

_renderDay(day,date){
  todayDate = new Date
  todayDay = todayDate.getDate()
  todayDayOfWeek = todayDate.getDay()
    switch (day){
      case 0:
        nameDay = "Sunday";
        break;
      case 1:
        nameDay = "Monday"
        break;
      case 2 :
        nameDay = "Tuesday";
        break;
      case 3 :
        nameDay = "Wednesday";
        break;
      case 4 :
        nameDay = "Thursday";
        break;
      case 5 :
        nameDay = "Friday";
        breakl
      case 6 :
        nameDay = "Saturday";
      default:
        nameDay = "other"
  }
  if (todayDayOfWeek == day && todayDay == date){
    return(
      <Text style = {stylesActyvityLog.headerOfList}>Today</Text>
    )
  }else{
    return(
      <Text style = {stylesActyvityLog.headerOfList}>{nameDay},{date}</Text>
    )
  }

}

_renderRow(rowData: string, sectionID: number, rowID: number,self){
  var year = ''
  var month = ''
  var day = ''
  var date = ''
  if (rowData.year != null && rowData.month != null){
    year = rowData.year
    month = rowData.month
    day = rowData.day
    date = rowData.data
  }
  return(
    <View>
      {this._renderDate(year,month)}
      <TouchableOpacity onPress = {() => self._renderDitails(rowData)}>
        {this._renderDay(day, date)}
        <View
          style = {{width : width , height : height /20,flexDirection: 'row'}}>
          <View style ={stylesActyvityLog.forView}>
            <Text style = {stylesActyvityLog.textData}>
              {this._renderPts(rowData.pts)}
            </Text>
            <Text style = {stylesActyvityLog.textPrefix}>
              PTS
            </Text>
          </View>
          <View style ={stylesActyvityLog.forView}>
            <Text style = {stylesActyvityLog.textData}>
              {rowData.distance}
            </Text>
            <Text style = {stylesActyvityLog.textPrefix}>
              mi
            </Text>
          </View>
          <View style = {stylesActyvityLog.forView}>
            {this._renderTime(rowData.time)}
          </View>
          <View style = {stylesActyvityLog.forView}>
            <Text style = {stylesActyvityLog.textData}>
             {rowData.speed}
            </Text>
            <Text style = {stylesActyvityLog.textPrefix}>
              min/mil
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
      )
}

_renderListView(){
  var self = this
      return(
        <ListView
          style={stylesActyvityLog.scrollView}
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
              'day' : List[i].day,
              'month' : List[i].month,
              'year' : List[i].year,
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
              'day' : dis.day,
              'month' : dis.month,
              'year' : dis.year,
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
    <View style={stylesActyvityLog.container}>
      <View style={stylesActyvityLog.header}>
      <View style={stylesActyvityLog.viewForButtonAndText}>
        <TouchableOpacity onPress ={() => this._handlePressId(2)}>
          <Image
            source = {require('./images/back.png')}
            style = {stylesActyvityLog.imgBack}/>
        </TouchableOpacity>
        <Text style={stylesActyvityLog.textLog}>ACTIVITY LOG</Text>
      </View>
        <View style = {stylesActyvityLog.viewForText}>
          <Text style = {stylesActyvityLog.Activities}>Activities</Text>
          <Text style = {stylesActyvityLog.Points}>Points</Text>
        </View>
        <View style = {stylesActyvityLog.viewForNomber}>
          <Text style = {stylesActyvityLog.nomberActivities}>45</Text>
          <Text style = {stylesActyvityLog.nomberPoints}>576</Text>
        </View>
        <Image
          source = {require('./images/Group 4.png')}
          style = {stylesActyvityLog.imgLine}/>
        <Image
          source = {require('./images/Group2.png')}
          style = {stylesActyvityLog.imgPol}/>
        <Image
          source = {require('./images/Rectangle 4.png')}
          style = {stylesActyvityLog.imgLevel}>
            <Text style = {stylesActyvityLog.textLevl}>LEVL 2</Text>
        </Image>
        <Text style = {stylesActyvityLog.ptsToNextLevl}>233 pts. to Level 3</Text>
      </View>
      <ProgressViewIOS
        style = {stylesActyvityLog.progres}
        progressTintColor = '#674DCD'
        progress = {0.5}/>
      {this._renderListView()}
    </View>
  );
  }
}
