import React, { Component } from 'react';
import { Linking, StyleSheet, View, TouchableHighlight } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import Screen from '../../components/screen';
import Button, { InlineButton } from '../../components/button';
import { connect } from 'react-redux';
import * as actions from './action-creators';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Title from './Title';

export class TransactionsScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: false,
    headerStyle: styles.screenHeader,
    headerTitle: (
      <Title />
    ),
    tabBarIcon: ({ tintColor }) => (
      <EntypoIcon
        name="list"
        size={25}
        color={tintColor}
      />
    ),
  }

  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  handleLoad() {
    const { loadTransactionHistory, network, address } = this.props;
    loadTransactionHistory(network, address.public);
  }

  handlePress(txid) {
    const api = this.props.network === "MainNet"
      ? "http://antcha.in"
      : "http://testnet.antcha.in";
    Linking.openUrl(`${api}/tx/hash/${txid}`);
  }

  render() {
    const { transactions } = this.props;
    return (
      <Screen
        refreshing={!!transactions.loading}
        onRefresh={this.handleLoad}
        style={{ paddingTop: 24 }}
      >
        {transactions.data.map(tx => {
          return (
            <TouchableHighlight
              key={tx.txid}
              underlayColor={colors.quarterGrey}
            >
              <View style={{ paddingTop: 10, paddingBottom: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.halfGrey }}>
                <Text>{tx.amount} {tx.type}</Text>
                <Text type="secondary">{tx.txid}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </Screen>
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

