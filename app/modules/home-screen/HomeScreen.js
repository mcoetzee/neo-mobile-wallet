import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Screen from '../../components/screen';
import Text from '../../components/text';
import Button from '../../components/button';
import Row from '../../components/row';
import styles, { colors } from '../../styles';
import screenStyles from './styles';
import * as actions from './action-creators';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Title from './Title';
import Markets from './Markets';
import GasClaimer from './GasClaimer';
import Holdings from './Holdings';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode';
import * as Animatable from 'react-native-animatable';

export class HomeScreen extends Component {
  static navigationOptions = ({ navigation}) => {
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
      headerRight: (
        <Icon.Button
          onPress={() => navigation.navigate('SendStack')}
          color={colors.primaryGreen}
          name="send"
          size={18}
          backgroundColor="transparent"
        >
          Send
        </Icon.Button>
      ),
    }
  }

  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  handleLoad() {
    const { refresh, network, address } = this.props;
    this.setState({ loading: true });
    refresh(network, address.public).then(() => this.setState({ loading: false }));
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
    const { balance, address, claim, markets, network, claimGas } = this.props;
    return (
      <Screen
        refreshing={this.state.loading}
        onRefresh={this.handleLoad}
        style={{ paddingTop: 64 }}
      >
        <Holdings balance={balance} markets={markets} />
        <GasClaimer claim={claim} network={network} onGasClaim={claimGas} />

        <View style={{ paddingTop: 10 }}>
          <Row style={{ paddingLeft: 0 }} onPress={() => this.props.navigation.navigate('PublicAddress')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Animatable.View animation="fadeIn">
                <QRCode
                  value={address.public}
                  size={32}
                  bgColor={colors.halfGrey}
                  fgColor={colors.black}
                />
              </Animatable.View>
              <View style={{ paddingLeft: 8 }}>
                <Text>Your Public Neo Address:</Text>
                <Text type="secondary">{address.public}</Text>
              </View>
            </View>
          </Row>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
          <Markets neo={markets.neo} gas={markets.gas} />
        </View>
      </Screen>
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
