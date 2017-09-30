import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function InlineButton(props) {
  const style = styles[props.type] || styles.default;
  const textStyles = [style.text, { paddingVertical: 0 }];
  if (props.styles) {
    textStyles.push(props.styles);
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={style.button}>
      <Text style={textStyles}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}
