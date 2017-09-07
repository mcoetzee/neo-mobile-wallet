import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import HomeModalStack from './home-screen-navigation';
import TransactionsScreen from '../modules/transactions-screen';
import styles, { colors } from '../styles';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';

export default TabNavigator(
  {
    HomeModalStack: {
      screen: HomeModalStack,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <LineIcon
            name="home"
            size={22}
            color={tintColor}
          />
        ),
      }
    },
    TransactionsStack: {
      screen: StackNavigator({
        Transactions: { screen: TransactionsScreen },
      }),
      navigationOptions: {
        title: 'Transactions'
      }
    }
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
  }
);
