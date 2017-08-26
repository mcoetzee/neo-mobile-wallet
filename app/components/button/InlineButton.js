import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { colors } from '../../styles';

export default function Button(props) {
  const style = styles[props.type] || styles.default;
  return (
    <TouchableOpacity onPress={props.onPress} style={style.button}>
      <Text style={[style.text, { paddingVertical: 0 }]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}
