import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Icon, List, ListItem } from 'react-native-elements';
import * as actions from '../actions';
import { connect } from 'react-redux';

class PlacesScreen extends Component {
  static navigationOptions = {
    title: 'Links',
  };

  componentDidMount() {

  }

  renderPlaces() {
    if(this.props.places){
      return (
        <List containerStyle={{marginBottom: 20}}>
          {
          this.props.places.map((item, i) => {
          return (<ListItem
            roundAvatar
            avatar={{uri:item.icon}}
            key={i}
            title={item.name}
            subtitle={this.getRating(item.rating)}
          />);
        })
        }
      </List>
      );
    }else{
      // render empty message
    }
 }

 getRating(rating) {
   return (rating > 0)?'Rating: '+rating+'/5':'No Rating';
 }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderPlaces()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

function mapStateToProps({ places }){
  const placesResults = (typeof(places.places.candidates) != 'undefined')?places.places.candidates:places.places.results;
  return { places: placesResults };
}

export default connect(mapStateToProps, actions)(PlacesScreen);
