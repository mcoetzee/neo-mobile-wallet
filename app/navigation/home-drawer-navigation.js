import React from 'react';
import { Platform } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import HomeTabs from './home-tabs-navigation';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';

export default DrawerNavigator({
  HomeTabs: {
    screen: HomeTabs,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <LineIcon
          name="home"
          size={22}
          color={tintColor}
        />
      ),
      gesturesEnabled: false
    }
  },
});
