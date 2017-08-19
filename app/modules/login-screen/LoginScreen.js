import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import TextInput from '../../components/text-input';
import * as actions from './action-creators';
import { connect } from 'react-redux';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { wif: '', message: '' };
  }

  handleSubmit = () => {
    const wif = this.state.wif.trim();
    if (!wif) {
      return;
    }

    this.props.loadWallet(wif)
      .then(response => {
        if (response.payload && response.payload.public) {
          // Success
          this.setState({ wif: '', message: '' });
          this.props.navigation.navigate('Home');
        } else {
          this.setState({ message: 'Could not log in with this key' });
        }
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        {!!this.state.message &&
          <View style={{ marginTop: 20 }}>
            <Text>{this.state.message}</Text>
          </View>
        }
        <TextInput
          placeholder="Enter your private key here (WIF)"
          value={this.state.wif}
          onChangeText={text => { this.setState({ wif: text }); }}
          returnKeyType="done"
          onSubmitEditing={this.handleSubmit}
        />
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={this.handleSubmit}>
            <Text>Log in</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('NewWallet')}>
            <Text>Create New Wallet</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, actions)(LoginScreen);
