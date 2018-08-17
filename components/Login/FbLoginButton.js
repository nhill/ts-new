import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FBLoginButton extends Component {
  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('<APP_ID>', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  render() {
    return (
      <View>
        <Button
          icon={<Icon name={'facebook'} color={'white'} size={20} />}
          onPress={this.logIn}
          title="Login with Facebook"
          color="#3B5998"
          buttonStyle={{ paddingLeft: 10, paddingRight: 10 }}
        />
      </View>
    );
  }
};
