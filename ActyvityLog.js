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


export default class ActyvityLog extends Component{
/*  constructor(){
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
    progres : 0,
  }
}

_handlePressId(Id) {
  this.props.navigator.replace({id: Id,});
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
      <ScrollView style = {styles.scrollView}>
        <Text></Text>
      </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
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
    marginTop : 5
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
