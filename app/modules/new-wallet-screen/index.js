import React, { Component } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import Text from '../../components/text';
import Screen from '../../components/screen';
import styles from '../../styles';

export default class NewWalletScreen extends Component {
  static navigationOptions = {
    title: 'New Wallet',
    headerStyle: styles.screenHeader,
    headerTitleStyle: { color: 'white' }
  }

  render() {
    return (
      <Screen>
        <Text>New Wallet Screen</Text>
      </Screen>
    );
  }
}
