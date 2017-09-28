import React from 'react';
import { NavigationActions, DrawerItems } from 'react-navigation';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DrawerButton from './DrawerButton';
import { colors } from '../../styles';
import { logOut } from '../../modules/data/wallet';
import { connect } from 'react-redux';

function DrawerContent(props) {
  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: colors.grey }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Image
          resizeMode="contain"
          style={{ width: 160, height: 100 }}
          source={require('../../assets/logo-black.png')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DrawerItems {...props} style={{ marginTop: 0 }}/>
          <DrawerButton
            onPress={() => {
              props.logOut();
              props.navigation.dispatch(resetToLogin);
            }}
          >
            Log out
          </DrawerButton>
      </View>
    </View>
  );
}

const resetToLogin = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'Login' })]
});

export default connect(null, { logOut })(DrawerContent);
