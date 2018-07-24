import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView, AppLoading } from 'expo';
import { connect } from 'react-redux';
import actions from '../actions/index'

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon:  ({tintColor}) => {
        return <Icon name="my-location" size={30} color={tintColor} />
    }
  };

  state = {
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    },
    mapLoaded: false
  };

  componentDidMount() {
    this.setState({mapLoaded: true});
      navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log(position);
         this.setState({
           region: {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             longitudeDelta: 0.04,
             latitudeDelta: 0.09
           },
           mapLoaded: true
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
     );
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    // popup then find places

    this.props.fetchPlaces(this.state.region, () => {
      this.props.navigation.navigate('places');
    });
  }

  render() {
    if(this.state.mapLoaded === false){
      return <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>;
    }

    return(
      <View style={{ flex:1 }}>
        <MapView
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={{ flex:1 }}
        />
        <View style={styles.buttonContainer}>
          <Button large title="Search This Area" backgroundColor="#009688" icon={{ name: 'search' }} onPress={this.onButtonPress} />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};


export default connect(null, actions)(MapScreen);

// 4201738803816157 -- Indeed API key
