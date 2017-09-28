import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../../styles';

export default function DrawerButton(props) {
  return (
    <View>
      <TouchableOpacity onPress={() => props.onPress()}>
        <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 15 }}>
          <LineIcon
            name="logout"
            size={22}
            color={colors.black}
          />
          <Text style={{ paddingLeft: 35, paddingVertical: 5, fontSize: 14, fontWeight: '500' }}>
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
