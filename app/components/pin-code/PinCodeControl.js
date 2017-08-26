import React, { Component } from 'react';
import { View } from 'react-native';
import Text from '../text';
import { colors } from '../../styles';
import styles from './styles';

export default class PinCodeControl extends Component {
  static propTypes = {
    pin: React.PropTypes.string,
    pinLength: React.PropTypes.number,
  };

  render() {
    const { pin, pinLength } = this.props;
    const pills = [];
    for (var i = 0; i < pinLength; i++) {
      pills.push(
        <View key={i} style={styles.pinBox}>
          {!!pin.charAt(i) &&
            <Text style={{ color: colors.white, fontSize: 16 }}>•</Text>
          }
        </View>
      );
    }

    return (
      <View style={styles.pinBoxList}>
        {pills}
      </View>
    );
  }
}
