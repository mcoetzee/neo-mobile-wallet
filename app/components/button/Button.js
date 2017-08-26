import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function Button(props) {
  let style = styles[props.type] || styles.default;
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.onPress} style={style.button}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {props.icon &&
            <View style={{ alignSelf: 'center' }}>
              {props.icon}
            </View>
          }
          <Text style={style.text}>
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
