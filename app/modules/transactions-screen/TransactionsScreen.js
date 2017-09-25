import React, { Component } from 'react';
import { Linking, StyleSheet, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import Screen from '../../components/screen';
import Button, { InlineButton } from '../../components/button';
import { connect } from 'react-redux';
import * as actions from './action-creators';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Title from './Title';

export class TransactionsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: false,
      headerStyle: styles.screenHeader,
      headerTitle: (
        <Title />
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={{ marginLeft: 10 }}>
          <IonIcon color={colors.white} name="md-menu" size={22} />
        </TouchableOpacity>
      ),
      tabBarIcon: ({ tintColor }) => (
        <EntypoIcon
          name="list"
          size={25}
          color={tintColor}
        />
      ),
    };
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  handleLoad() {
    const { refresh, network, address } = this.props;
    this.setState({ loading: true });
    refresh(network, address.public).then(() => this.setState({ loading: false }));
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
        refreshing={this.state.loading}
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
