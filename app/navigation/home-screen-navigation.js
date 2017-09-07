import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from '../modules/home-screen';
import PublicAddressScreen from '../modules/public-address-screen';
import SendScreen from '../modules/send-screen';
import SendScreenScreen from '../modules/send-confirm-screen';

export default StackNavigator(
  {
    HomeStack: {
      screen: StackNavigator({
        Home: { screen: HomeScreen },
        PublicAddress: { screen: PublicAddressScreen },
      }),
      navigationOptions: { header: null }
    },
    SendStack: {
      screen: StackNavigator({
        Send: { screen: SendScreen },
        SendConfrm: { screen: SendScreenScreen },
      }),
      navigationOptions: { header: null }
    },
  }, {
    mode: 'modal'
  }
);
