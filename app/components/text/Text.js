import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

export default function CustomText(props) {
  let style = styles[props.type] || styles['default']
  if (props.style) {
    style = [style, props.style];
  }

  return (
    <Text style={style}>{props.children}</Text>
  );
}
