import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import HomeTabs from './home-tabs-navigation';
import DrawerContent from '../components/drawer-content';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../styles';

export default DrawerNavigator(
  {
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
  },
  {
    contentComponent: props => <DrawerContent {...props} />,
    contentOptions: {
      activeTintColor: colors.black,
    }
  }
);
