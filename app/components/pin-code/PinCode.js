import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import Text from '../text';
import PinCodeControl from './PinCodeControl';
import { colors } from '../../styles';
import styles from './styles';

export default class PinCode extends Component {
  static defaultProps = { pinLength: 4 }

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onPinChange = (value) => {
    if (value.length && isNaN(value)) {
      return;
    }

    this.setState({ value }, () => {
      if (!this.isComplete() || this.isIncorrect()) {
        return;
      }
      this.props.onComplete(this.state.value);
    });
  }

  isComplete() {
    return this.state.value.length === this.props.pinLength;
  }

  isIncorrect() {
    const { match } = this.props;
    return !!match && this.isComplete() && this.state.value !== match;
  }

  render() {
    const { value } = this.state;
    const { label, pinLength } = this.props;
    const error = this.isIncorrect();
    return (
      <View style={styles.container}>
        <View style={styles.pinView}>
          {!!label && <Text>{label}</Text>}
          <TouchableOpacity onPress={() => this.pinInput.focus()}>
            <PinCodeControl pin={value} pinLength={pinLength} />
          </TouchableOpacity>
          {error && <Text style={{ color: colors.orange }}>This pin is incorrect</Text>}
          {!error && <Text style={{ color: colors.grey }}>{value.charAt(value.length - 1)}</Text>}
        </View>
        <TextInput
          ref={input => { this.pinInput = input; }}
          autoFocus={true}
          blurOnSubmit={false}
          defaultValue={value}
          enablesReturnKeyAutomatically={false}
          keyboardType='numeric'
          maxLength={this.props.pinLength}
          onChangeText={this.onPinChange}
          style={styles.input}
        />
      </View>
    );
  }
}

