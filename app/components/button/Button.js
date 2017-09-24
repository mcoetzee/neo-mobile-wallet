import React from 'react';
import { View, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { colors }  from '../../styles';

export default function Button(props) {
  let style = styles[props.type] || styles.default;

  let content;
  if (props.busy) {
    content = (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <ActivityIndicator
          color={colors.primaryGreen}
          size="small"
          style={{ transform: [{ scale: 0.7 }]}}
        />
        <Text style={[style.text, { opacity: 0.85, paddingLeft: 5 }]}>
          {props.busy}
        </Text>
      </View>
    );
  } else {
    content = (
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
    )
  }

  const bs = {};
  if (props.disabled) {
    bs.opacity = 0.55;
  }
  if (props.busy) {
    bs.borderColor = 'transparent';
  }

  return (
    <View style={style.container}>
      <TouchableHighlight
        onPress={() => { !props.disabled && !props.busy && props.onPress() }}
        style={[style.button, bs]}
      >
        {content}
      </TouchableHighlight>
    </View>
  );
}
