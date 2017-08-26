import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import * as Keychain from 'react-native-keychain';
import PinCode from '../../components/pin-code';
import * as actions from './action-creators';
import { connect } from 'react-redux';

export class SendConfrmScreen extends Component {
  static navigationOptions = {
    title: 'Confirm',
    headerStyle: styles.screenHeader,
    headerTitleStyle: { color: 'white' }
  }

  constructor(props) {
    super(props);
    this.state = { message: '', pin: '' };
  }

  componentDidMount() {
    Keychain.getGenericPassword()
      .then(creds => this.setState({ pin: creds.password }));
  }

  handleSubmit = (pinCofirm) => {
    const { params } = this.props.navigation.state;
    this.props.sendAsset(this.props.network, params.address, this.props.address.wif, params.asset, params.amount);
    this.props.navigation.goBack();
  }

  render() {
    const { params } = this.props.navigation.state;
    const { message } = this.state;
    return (
      <KeyboardAvoidingView style={styles.screenContainer}>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text>Address</Text>
          <Text>{params.address}</Text>
          <Text>Amount</Text>
          <Text>{params.asset.toUpperCase()} {params.amount}</Text>
        </View>
        <PinCode
          label="Enter your pin to confirm"
          onComplete={this.handleSubmit}
          match={this.state.pin}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.data.wallet.address,
    balance: state.data.wallet.balance,
    network: state.data.network,
  };
}

export default connect(mapStateToProps, actions)(SendConfrmScreen);
