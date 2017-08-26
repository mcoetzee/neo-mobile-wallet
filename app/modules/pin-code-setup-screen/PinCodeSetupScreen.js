import React, { Component } from 'react';
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import PinCode from '../../components/pin-code';
import { HeaderTitle } from 'react-navigation';

export default class PinCodeSetupScreen extends Component {
  static navigationOptions = {
    headerTitle: (
      <HeaderTitle style={{ color: 'white' }}>
        Pin Code Setup <Text style={{ color: colors.grey }}>(1/2)</Text>
      </HeaderTitle>
    ),
    headerStyle: styles.screenHeader,
  }

  render() {
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
          label="Enter your pin code"
          onComplete={pin => this.props.navigation.navigate('PinCodeConfirm', { pin })}
        />
      </KeyboardAvoidingView>
    );
  }
}
