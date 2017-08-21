import React, { Component } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import Text from '../../components/text';
import styles from '../../styles';

export default class NewWalletScreen extends Component {
  static navigationOptions = {
    title: 'New Wallet',
    headerStyle: styles.screenHeader,
    headerTitleStyle: { color: 'white' }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text>New Wallet Screen</Text>
      </View>
    );
  }
}
