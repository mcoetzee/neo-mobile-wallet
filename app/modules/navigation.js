import React from 'react';
import { Platform, Button } from 'react-native';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './login-screen';
import NewWalletScreen from './new-wallet-screen';
import HomeScreen from './home-screen';

const Home = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    })
  }
});

export const Main = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Neo Login',
    })
  },
  NewWallet: {
    screen: NewWalletScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'New Neo Wallet',
    })
  },
  Home: {
    screen: Home,
    navigationOptions: { header: null }
  }
})

