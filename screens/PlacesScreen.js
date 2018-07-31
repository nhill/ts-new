import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Icon, List, ListItem } from 'react-native-elements';
import * as actions from '../actions';
import { connect } from 'react-redux';

class PlacesScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  componentDidMount() {

  }

  renderPlaces() {
    if(this.state.places){
      return (
        <List containerStyle={{marginBottom: 20}}>
          {
          this.state.places.map((item, i) => {
          return (<ListItem
            roundAvatar
            avatar={{uri:item.icon}}
            key={i}
            title={item.name}
            subtitle={item.rating}
          />);
        })
        }
      </List>
      );
    }else{
      // render empty message
    }
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
  return { places: (places.places.candidates)?places.places.candidates:places.results };
}

export default connect(mapStateToProps, actions)(PlacesScreen);
