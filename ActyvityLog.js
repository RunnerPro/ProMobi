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
  Image

} from 'react-native';

export default class ActyvityLog extends Component{

constructor(){
  super()
  this.state = {
    list: '',
    pressed:false
  }
  try {
  AsyncStorage.getItem('database').then((value) =>{
            this.setState({
              list:JSON.parse(value)
            })
      })
  }
  catch(err){
    console.log(err)
  }
}
  parseData(){
    if(this.state.list){
      return this.state.list.map((data,i)=>{
      return(<View style={styles.dataList}
       key={i}>
       <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
         <Text style={styles.score}>Score</Text>
            <TouchableOpacity >
              <Text style={styles.textType}>{data.type}</Text>
              </TouchableOpacity>
                 </View>
                  <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                   <Text style={styles.textDistance}>{data.distance+' ml'}</Text>
                   <Text style={styles.textTime}>Time</Text>
                   <Text style={styles.textSpeed}>Speed</Text>
                  </View>
                  </View>
               )
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
                source={require('./images/back.png')}
                style ={styles.imgBack}/>
                </TouchableOpacity>

            </View>
              <ScrollView style={styles.list}>
                {this.parseData()}
              </ScrollView>
          </View>
    )
}
 }
const styles =StyleSheet.create({

score:{
  paddingLeft:5,
  fontSize:12,
  },
viewStyle: {
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: 30,
  paddingTop: 25,
  },
textType: {
  color:'blue',
  paddingLeft:10,
  fontSize: 12
  },
textTime: {
  paddingLeft:30,
  fontSize: 12
  },
textSpeed: {
  paddingLeft:30,
  fontSize: 12
 },
textDistance: {
  paddingLeft:48,
  fontSize: 12
},
 textStyle: {
  fontSize: 15
},
container:{
  flex: 1,
},
container:{
 marginTop:10,
 paddingLeft:5,
 paddingRight:5
},
dataList:{
  marginTop:10,
  marginBottom:5
},
header:{
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  marginTop:15,
  backgroundColor: '#F8F8F8',
  height: 70,
},
imgBack:{
  left: 0,
  right: 0,
  top: 15,
  bottom:0 ,
  position: 'absolute',
  height: 50,
  width: 50,
},
})
