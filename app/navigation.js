import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from './modules/login-screen';
import HomeScreen from './modules/home-screen';
import PublicAddressScreen from './modules/public-address-screen';
import SendScreen from './modules/send-screen';
import TransactionsScreen from './modules/transactions-screen';
import styles, { colors } from './styles';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  PublicAddress: { screen: PublicAddressScreen },
  Send: { screen: SendScreen },
});

const TransactionsStack = StackNavigator({
  TransactionsStack: { screen: TransactionsScreen },
});

const HomeTabs = TabNavigator({
  Home: {
    screen: HomeStack,
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
  swipeEnabled: true,
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
  Home: {
    screen: HomeTabs,
    navigationOptions: { header: null }
  }
});

