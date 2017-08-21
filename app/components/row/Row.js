import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { CHEVRON_SIZE } from './styles';
import { colors } from '../../styles';

Row.propTypes = {
  onPress: PropTypes.func,
};

export default function Row({ children, onPress }) {
  const iconName = Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward';
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors.grey}
    >
      <View style={styles.row}>
        {children}
        <View style={styles.chevronContainer}>
          <Icon
            name={iconName}
            size={CHEVRON_SIZE}
            style={styles.chevron}
            color={colors.grey}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

