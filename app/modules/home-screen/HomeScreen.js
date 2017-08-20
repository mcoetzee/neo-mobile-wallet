import React, { Component } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import Text from '../../components/text';
import Button from '../../components/button';
import styles from '../../styles';
import * as actions from './action-creators';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

export class HomeScreen extends Component {
  static navigationOptions = {
    title: <Text>Home</Text>,
    headerStyle: styles.screenHeader
  }

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content');

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
      <View style={styles.screenContainer}>
        <ScrollView>
          <Spinner visible={this.state.loading} overlayColor="rgba(14, 18, 22, 0.89)"/>
          <Text>NEO: {this.props.balance.neo}</Text>
          <Text>GAS: {this.props.balance.gas}</Text>
          <Button type="primary">Refresh</Button>

          <Text>Your Wallet Adress:</Text>
          <Text type="secondary">{this.props.address.public}</Text>
        </ScrollView>
      </View>
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
