import React, { Component } from 'react';
import { View, ScrollView, StatusBar, RefreshControl, StyleSheet } from 'react-native';
import Text from '../../components/text';
import Button from '../../components/button';
import Row from '../../components/row';
import styles, { colors } from '../../styles';
import screenStyles from './styles';
import * as actions from './action-creators';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Title from './Title';
import Toast from 'react-native-root-toast';
import Markets from './Markets';

export class HomeScreen extends Component {
  static navigationOptions = {
    headerStyle: styles.screenHeader,
    headerTitle: (
      <Title />
    )
  }

  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    this.handleLoad();
  }

  handleLoad() {
    this.setState({ loading: true });
    const { loadBalance, loadGasClaim, loadNeoMarketData, loadGasMarketData, network, address } = this.props;
    Promise.all([
      loadBalance(network, address.public),
      loadGasClaim(network, address.public),
      loadNeoMarketData(),
      loadGasMarketData()
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

  getTotalUSDValue() {
    const { balance, markets } = this.props;
    if (balance.neo && balance.gas && markets.neo.price_usd && markets.gas.price_usd) {
      return (
        balance.neo * parseFloat(markets.neo.price_usd) +
        balance.gas * parseFloat(markets.gas.price_usd)
      ).toFixed(2).toString();
    }
    return '-';
  }

  render() {
    const { balance, claim, markets } = this.props;
    return (
      <ScrollView style={styles.screenContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.handleLoad}
          />
        }
      >
        <Spinner visible={false} overlayColor="rgba(14, 18, 22, 0.89)"/>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 150 }}>
            <Text type="primary" style={screenStyles.symbol}>NEO</Text>
            <Text style={screenStyles.amount}>{balance.neo}</Text>
          </View>
          <View style={{ width: 150 }}>
            <Text type="primary" style={screenStyles.symbol}>GAS</Text>
            <Text style={screenStyles.amount}>{balance.gas && balance.gas.toFixed(3)}</Text>
          </View>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text type="secondary" style={screenStyles.symbol}>
            US ${this.getTotalUSDValue()}
          </Text>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Button type="primary" disabled={!claim.amount}>Claim {claim.amount} GAS</Button>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Row onPress={() => this.props.navigation.navigate('PublicAddress')}>
            <View>
              <Text>Your Public Neo Address:</Text>
              <Text type="secondary">{this.props.address.public}</Text>
            </View>
          </Row>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
          <Markets neo={markets.neo} gas={markets.gas} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.data.wallet.address,
    balance: state.data.wallet.balance,
    claim: state.data.wallet.claim,
    transactions: state.data.wallet.transactions,
    network: state.data.network,
    markets: state.data.markets
  };
}

export default connect(mapStateToProps, actions)(HomeScreen);
