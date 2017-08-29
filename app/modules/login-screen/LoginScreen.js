import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import styles, { colors } from '../../styles';
import TextInput from '../../components/text-input';
import Text from '../../components/text';
import Screen from '../../components/screen';
import Button, { InlineButton } from '../../components/button';
import * as actions from './action-creators';
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Neo',
    headerStyle: styles.screenHeader,
    headerTitleStyle: { color: 'white' }
  }

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
          this.setState({ wif: '' });

          Keychain.getGenericPassword()
            .then(credentials => {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: credentials ? 'Home' : 'PinCodeSetup' })
                ]
              })
              this.props.navigation.dispatch(resetAction)
            }).catch((error) => {
              console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
            });
        } else {
          this.setState({ message: 'Could not log in with this key' });
        }
      });
  };

  render() {
    const { message } = this.state;
    return (
      <Screen style={{ paddingTop: 40 }}>
        {!!message &&
          <View style={{ marginBottom: 20, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.orange, padding: 7 }}>
            <Text style={{ color: colors.orange }}>{message}</Text>
          </View>
        }
        <Text>Log in to your wallet</Text>
        <TextInput
          placeholder="Enter your private key (WIF)"
          value={this.state.wif}
          onChangeText={text => { this.setState({ wif: text }); }}
          returnKeyType="done"
          onSubmitEditing={this.handleSubmit}
        />
        <View style={{
          marginTop: 15,
        }}>
          <View style={{ borderColor: colors.primaryGreen, borderWidth: StyleSheet.hairlineWidth }}>
            <Icon.Button
              onPress={this.handleSubmit}
              color={colors.primaryGreen}
              name="wallet"
              size={22}
              backgroundColor={colors.black}
              style={{ paddingVertical: 4 }}
            >
              Log in
            </Icon.Button>
          </View>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 40,
        }}>
          <Text>Need a wallet?</Text>
          <InlineButton onPress={() => this.props.navigation.navigate('NewWallet')}>
            New Wallet
          </InlineButton>
        </View>
      </Screen>
    );
  }
}

export default connect(null, actions)(LoginScreen);

// <View style={{
//   flex: 1,
//   flexDirection: 'row',
//   marginTop: 40,
// }}>
//   <Text>Development</Text>
//   <InlineButton onPress={() => Keychain.resetGenericPassword()}>
//     Reset Pin
//   </InlineButton>
// </View>
