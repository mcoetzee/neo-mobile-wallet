import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { colors }  from '../../styles';

export default function Button(props) {
  let style = styles[props.type] || styles.default;
  let buttonStyle = style.button;
  let textStyle = style.text;

  if (props.busy) {
    buttonStyle = [buttonStyle, { borderColor: colors.black }];
  }
  if (props.disabled || props.busy) {
    textStyle = [textStyle, { color: colors.primaryFaded }];
  }
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.onPress} style={buttonStyle} disabled={props.disabled}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {!!props.busy && <ActivityIndicator color={colors.primaryGreen} size="small" />}
          {!props.busy && props.icon &&
            <View style={{ alignSelf: 'center' }}>
              {props.icon}
            </View>
          }
          <Text style={textStyle}>
            {props.busy || props.children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
