import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  componentDidMount() {

  }

  searchForPlace() {
    axios.get('')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button large title="Search For " backgroundColor="#009688" icon={{ name: 'search' }} onPress={this.searchForPlace} />
        </View>
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
