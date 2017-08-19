import React, { Component } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import * as actions from './action-creators';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    const { loadBalance, loadTransactionHistory, network, address } = this.props;
    Promise.all([
      loadBalance(network, address.public),
      loadTransactionHistory(network, address.public)
    ]).then(() => {
      this.setState({ loading: false });
    })
  }

  componentWillReceiveProps(nextProps) {
    const { balance, transactions } = this.props;
    if (
      nextProps.balance.error && !balance.error ||
      nextProps.transactions.error && !transactions.error
    ) {
      Toast.show('Something went wrong loading your data', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <Spinner visible={this.state.loading} overlayColor="rgba(0, 0, 0, 0.89)"/>
        <Text>Your Wallet</Text>
        <Text>Adress: {this.props.address.public}</Text>
        <Text>NEO: {this.props.balance.neo}</Text>
        <Text>GAS: {this.props.balance.gas}</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.data.wallet.address,
    balance: state.data.wallet.balance,
    transactions: state.data.wallet.transactions,
    network: state.data.network
  };
}

export default connect(mapStateToProps, actions)(HomeScreen);
