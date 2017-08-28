import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';

import LoginScreen from './modules/login-screen';
import HomeScreen from './modules/home-screen';
import PublicAddressScreen from './modules/public-address-screen';
import PinCodeSetupScreen from './modules/pin-code-setup-screen';
import PinCodeConfirmScreen from './modules/pin-code-confirm-screen';
import SendScreen from './modules/send-screen';
import SendScreenScreen from './modules/send-confirm-screen';
import TransactionsScreen from './modules/transactions-screen';
import styles, { colors } from './styles';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  PublicAddress: { screen: PublicAddressScreen },
});

const SendStack = StackNavigator({
  Send: { screen: SendScreen },
  SendConfrm: { screen: SendScreenScreen },
});

const HomeModalStack = StackNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: { header: null }
    },
    Send: {
      screen: SendStack,
      navigationOptions: { header: null }
    },
  },
  { mode: 'modal' }
);

const TransactionsStack = StackNavigator({
  TransactionsStack: { screen: TransactionsScreen },
});

const PinCodeSetupStack = StackNavigator({
  PinCodeSetup: { screen: PinCodeSetupScreen },
  PinCodeConfirm: { screen: PinCodeConfirmScreen }
});

const HomeTabs = TabNavigator({
  Home: {
    screen: HomeModalStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <LineIcon
          name="home"
          size={22}
          color={tintColor}
        />
      ),
    }
  },
  Transactions: { screen: TransactionsStack },
}, {
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: 'white',
    activeBackgroundColor: colors.quarterGrey,
    style: {
      borderTopWidth: 0,
      backgroundColor: colors.black
    }
  }
});

export const Main = StackNavigator({
  Login: { screen: LoginScreen },
  PinCodeSetup: {
    screen: PinCodeSetupStack,
    navigationOptions: { header: null }
  },
  Home: {
    screen: HomeTabs,
    navigationOptions: { header: null, gesturesEnabled: false }
  }
});

preventGoingBackFrom('Home', HomeStack);
preventGoingBackFrom('PinCodeSetup', PinCodeSetupStack);

function preventGoingBackFrom(routeName, navigator) {
  const defaultGetStateForAction = navigator.router.getStateForAction;

  navigator.router.getStateForAction = (action, state) => {
    if (
      state &&
      action.type === NavigationActions.BACK &&
      state.routes[state.index].routeName === routeName
    ) {
      // Returning null from getStateForAction means that the action
      // has been handled/blocked, but there is not a new state
      return null;
    }

    return defaultGetStateForAction(action, state);
  };
}
