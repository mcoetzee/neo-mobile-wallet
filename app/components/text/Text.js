import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

export default function CustomText(props) {
  const style = styles[props.type] || styles['default']
  return (
    <Text style={style}>{props.children}</Text>
  );
}
