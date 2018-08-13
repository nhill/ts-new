import React, { Component } from 'react';
import { View, Keyboard, Dimensions, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './../actions';

import LoadingSpinner from '../components/LoadingSpinner';
import { LoginHeaderImage, FbSignInUpButton, FooterNavButtons } from '../components/Login';
import ErrorMessage from '../components/ErrorMessage';

import {
  RkStyleSheet
} from 'react-native-ui-kitten';

class LoginScreen extends Component {

  state = {
    keyboardflag: false,
    showEmailPwdState: true
  };

  componentWillMount () {
    // set listeners on when the keyboard is up or down
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    // remove the listeners upon exit
   this.keyboardDidShowListener.remove();
   this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    // use the spring animation when the key board is shown
    if ( true ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide () {
    // use the spring animation when the key board is hidden
    if ( true ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  _renderEmailPwdOption() {
    if ( this.props.emailPwdBtnStr == 'SignIn' || this.state.showEmailPwdState ) {
      // In the case of login screen or if the email pwd button is pressed
      return (
        <View>
          <EmailTextInput />
          <PwdTextInput />
          <EmailPwdButton emailPwdBtnStr={this.props.emailPwdBtnStr} />
        </View>
      );
    }
  }

//


  pressEmailPwdButton() {
      this.setState({ showEmailPwdState: true });
  }

  render() {
    android_s_c_marginTop = (this.state.keyboardflag) ? 30 : 0; // Platform.OS === 'android' &&
    let screen_width = Dimensions.get('window').width;
    let FbButtonSize = { marginHorizontal: 20 };

    if ( this.props.loginStatus != 'fbchecking' ) {
        // if login status is not fbchecking then react to keyboard up as usual
        keyboardUp_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'space-between';
    }
    else {
      console.log(this.props.loginStatus);
      // if fbchecking act like the keyboard is down even if it is up
      android_s_c_marginTop = 0;
      keyboardUp_justifyContent = 'space-between';
    }

    // for the case where there is signup and showemailpwdstate button is not pressed
    if ( this.props.emailPwdBtnStr=='SignUp' && !this.state.showEmailPwdState ) {
      keyboardUp_justifyContent = 'flex-start';
    }

    let keyboardUp_styles_content = {justifyContent: keyboardUp_justifyContent};
    android_styles_container = {marginTop: android_s_c_marginTop};

    return (
       <View style={{ ...styles.screen }}>

         <LoadingSpinner />

         <View>
           <LoginHeaderImage
             keyboardflag = {this.state.keyboardflag}
             emailPwdBtnStr={this.props.emailPwdBtnStr}
             />
         </View>

         <View style={{ ...FbButtonSize, ...android_styles_container }}>
           <FbSignInUpButton emailPwdBtnStr={this.props.emailPwdBtnStr} fbBtnStr={this.props.fbBtnStr} />
         </View>

         {this._renderEmailPwdOption()}

         <FooterNavButtons
           emailPwdBtnStr={this.props.emailPwdBtnStr}
           _footerButton={this.props._footerButton}
           onForgotPassword={this.props.onForgotPassword}
           onNavString1={this.props.onNavString1}
           onNavString2={this.props.onNavString2}
           onNavPress={this.props.onNavPress}
           keyboardflag={this.state.keyboardflag}
           pressEmailPwdButton={this.pressEmailPwdButton.bind(this)}
           showEmailPwdState={this.state.showEmailPwdState}
         />

         <ErrorMessage />
       </View>
     );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
}));

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  const { loginStatus, } = auth;
  return { loginStatus, };
};
export default connect(mapStateToProps,null)(LoginScreen);
