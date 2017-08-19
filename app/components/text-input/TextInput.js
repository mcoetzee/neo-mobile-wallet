import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

import styles from './styles';

class CustomInput extends Component {
  focus = () => {
    this.input.focus();
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          ref={(input) => this.input = input}
          {...this.props}
        />
      </View>
    );
  }
}

export default CustomInput;
