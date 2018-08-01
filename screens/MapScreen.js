import React, { Component } from 'react';
import { View, Text, TextInput, ActivityIndicator, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView, AppLoading } from 'expo';
import { DialogComponent }from 'react-native-dialog-component';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
    /*
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
     */
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onPlacesButtonPress = () => {
    this.props.fetchPlaces( this.state.region, this.state.text, () => {
      this.props.navigation.navigate('places');
    });
  }

  onButtonPress = () => {
    this.dialogComponent.show();
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
          <TextInput
                 style={{ height: 40, width: '80%' }}
                 onChangeText={(text) => this.setState({text})}
                 value={this.state.text}
               />
          <Icon name="search" style={styles.icon} onPress={this.onPlacesButtonPress} />
        </View>
        <View>
          <DialogComponent
            ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
          >
            <View>
              <TextInput
                     style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                     onChangeText={(text) => this.setState({text})}
                     value={this.state.text}
                   />
              <Button large title="Go" backgroundColor="#009688" icon={{ name: 'search' }} onPress={this.onPlacesButtonPress} />
            </View>
          </DialogComponent>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff'
  }
};


export default connect(null, actions)(MapScreen);

// 4201738803816157 -- Indeed API key
