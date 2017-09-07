import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';

import LoginScreen from '../modules/login-screen';
import NewWalletScreen from '../modules/new-wallet-screen';
import PinCodeSetupScreen from '../modules/pin-code-setup-screen';
import PinCodeConfirmScreen from '../modules/pin-code-confirm-screen';
import HomeDrawer from './home-drawer-navigation';

export default StackNavigator({
  Login: { screen: LoginScreen },

  PinCodeSetupStack: {
    screen: StackNavigator({
      PinCodeSetup: { screen: PinCodeSetupScreen },
      PinCodeConfirm: { screen: PinCodeConfirmScreen }
    }),
    navigationOptions: { header: null }
  },

  HomeDrawer: {
    screen: HomeDrawer,
    navigationOptions: { header: null, gesturesEnabled: false }
  }
});
