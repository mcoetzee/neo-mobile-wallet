import React, { Component } from 'react';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import * as Keychain from 'react-native-keychain';
import PinCode from '../../components/pin-code';
import { HeaderTitle } from 'react-navigation';

export default class PinCodeSetupScreen extends Component {
  static navigationOptions = {
    headerTitle: (
      <HeaderTitle style={{ color: 'white' }}>
        Confirm Pin Code <Text style={{ color: colors.grey }}>(2/2)</Text>
      </HeaderTitle>
    ),
    headerStyle: styles.screenHeader,
  }

  handleSubmit = (pin) => {
    Keychain.setGenericPassword('@neo-p', pin)
      .then(() => {
        this.props.navigation.navigate('Home');
      }).catch((error) => {
        alert('Could not save ' + error);
      });
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <KeyboardAvoidingView style={styles.screenContainer}>
        <Text style={
          {
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            borderColor: colors.primaryGreen,
            borderWidth: StyleSheet.hairlineWidth
          }
        }>
          Remember this pin. You will need it to confirm transactions on this device
        </Text>
        <PinCode
          label="Confirm your pin code"
          match={params.pin}
          onComplete={this.handleSubmit}
        />
      </KeyboardAvoidingView>
    );
  }
}
