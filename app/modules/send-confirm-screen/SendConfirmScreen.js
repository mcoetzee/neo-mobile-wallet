import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import { BackButton } from '../../components/button';
import * as Keychain from 'react-native-keychain';
import PinCode from '../../components/pin-code';
import * as actions from './action-creators';
import { connect } from 'react-redux';

export class SendConfirmScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Confirm',
      headerStyle: styles.screenHeader,
      headerTitleStyle: { color: colors.white },
      headerLeft: (
        <BackButton navigation={navigation} />
      )
    };
  }

  constructor(props) {
    super(props);
    this.state = { message: '', pin: '' };
  }

  componentDidMount() {
    Keychain.getGenericPassword()
      .then(creds => this.setState({ pin: creds.password }));
  }

  handleSubmit = () => {
    const { params } = this.props.navigation.state;
    this.props.sendAsset(this.props.network, params.address, this.props.address.wif, params.asset, params.amount);
    this.props.navigation.goBack();
  }

  render() {
    const { params } = this.props.navigation.state;
    const { message } = this.state;
    return (
      <KeyboardAvoidingView style={styles.screenContainer}>
        <View style={
          {
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            borderColor: colors.primaryGreen,
            borderWidth: StyleSheet.hairlineWidth,
          }
        }>
          <Text type="secondary">Public Address</Text>
          <Text>{params.address}</Text>
          <Text type="secondary" style={{ marginTop: 10 }}>Amount</Text>
          <Text>{params.amount} {params.asset.toUpperCase()}</Text>
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

export default connect(mapStateToProps, actions)(SendConfirmScreen);
