import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  AsyncStorage
 } from 'react-native';

import {
  MapView
} from 'expo';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      region: {
        latitude: 37.3382,
        longitude: -121.8863,
        latitudeDelta: .25,
        longitudeDelta: .1
      }
    }
  }

  goistuanbul(){
    let istuanbul = {
      latitude: 41.067841,
      longitude: 29.045258,
      latitudeDelta: .25,
      longitudeDelta: .1
    }
    this.setState({region: istuanbul})
  }

  gosyndey(){
    let syndey = {
      latitude: -33.866174,
      longitude: 151.220345,
      latitudeDelta: .25,
      longitudeDelta: .1
    }
    this.setState({region: syndey})
  }

  gohongkong(){
    let hongkong = {
      latitude: 22.294074,
      longitude: 114.171995,
      latitudeDelta: .25,
      longitudeDelta: .1
    }
    this.setState({region: hongkong})
  }

  getCurrent(){
    navigator.geolocation.getCurrentPosition(
      (success) => {
        let currentLocation = {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
          latitudeDelta: .25,
          longitudeDelta: .1
        }
        this.setState({region: currentLocation})
      },
      (error) => {
        alert("Unable to get current location! ")
      },
      {}
    )
  }

  componentDidMount(){
    AsyncStorage.getItem('region')
      .then((result) =>{
        this.setState({region: JSON.parse(result)})
      });
  }

  render() {
    return (
      <View style={{
          flex: 1
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() =>
            this.goistuanbul()
          }
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}>
            <Text>Istanbul</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.gosyndey()}
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}>
            <Text>Sydney</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.gohongkong()}
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}>
            <Text>Hong Kong</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getCurrent()}
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}>
            <Text>Current Location</Text>
          </TouchableOpacity>
        </View>
        <MapView style={{flex: 7}} region={this.state.region} onRegionChange={(region) => AsyncStorage.setItem('region', JSON.stringify(region))}/>
      </View>
    );
  }
}

export default App;
