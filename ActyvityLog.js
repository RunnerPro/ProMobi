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

render() {
  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <ProgressViewIOS
        style = {styles.progres}
        progressTintColor = "purple"
        progress = {0.7}/>
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
  }
})
