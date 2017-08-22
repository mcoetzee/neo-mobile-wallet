import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import Text from '../../components/text';
import Button, { InlineButton } from '../../components/button';
import { connect } from 'react-redux';
import * as actions from './action-creators';
import Icon from 'react-native-vector-icons/Entypo';

export class TransactionsScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Transactions',
    headerStyle: styles.screenHeader,
    headerTitleStyle: { color: 'white' },
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="list"
        size={25}
        color={tintColor}
      />
    ),
  }

  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  handleLoad() {
    const { loadTransactionHistory, network, address } = this.props;
    loadTransactionHistory(network, address.public);
  }

  render() {
    const { transactions } = this.props;
    return (
      <ScrollView style={styles.screenContainer}
        refreshControl={
          <RefreshControl
            refreshing={transactions.loading}
            onRefresh={this.handleLoad}
          />
        }
      >
        {transactions.data.map(tx => {
          return <Text key={tx.txid}>{tx.txid}</Text>;
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.data.wallet.address,
    network: state.data.network,
    transactions: state.data.wallet.transactions
  };
}

export default connect(mapStateToProps, actions)(TransactionsScreen);

