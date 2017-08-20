import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function Button(props) {
  const style = styles[props.type] || styles.default;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={props.onPress}
        style={style.button}
      >
        <Text style={style.text}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
