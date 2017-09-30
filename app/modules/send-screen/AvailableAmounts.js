import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/text';
import styles, { colors } from '../../styles';
import * as Animatable from 'react-native-animatable';

export default function AvailableAmounts({ asset, balance }) {
  return (
    <View style={containerStyle}>
      <View style={{ marginBottom: 5 }}>
        <Text type="secondary">Available</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Animatable.Text
          style={{ fontSize: 10, color: colors.grey, opacity: asset === 'Neo' ? 1 : 0.85 }}
          transition="opacity"
          duration={300}
        >
          {balance.neo} NEO
        </Animatable.Text>
        <Text type="secondary" style={{ color: colors.halfGrey }}> / </Text>
        <Animatable.Text
          style={{ fontSize: 10, color: colors.grey, opacity: asset === 'Gas' ? 1 : 0.85 }}
          transition="opacity"
          duration={300}
        >
          {balance.gas} GAS
        </Animatable.Text>
      </View>
    </View>
  );
}

const containerStyle = {
  marginTop: 0,
  padding: 10,
  borderColor: colors.halfGrey,
  borderWidth: StyleSheet.hairlineWidth,
};
