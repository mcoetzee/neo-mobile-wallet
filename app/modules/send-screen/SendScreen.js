import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import styles, { colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import TextInput from '../../components/text-input';
import Text from '../../components/text';
import Button, { InlineButton } from '../../components/button';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import validate from './validation';

class SendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, dispatch } = navigation;
    return {
      title: 'Send',
      headerStyle: styles.screenHeader,
      headerTitleStyle: { color: colors.white },
      headerLeft: (
        <TouchableOpacity
          onPress={() => dispatch(NavigationActions.back())}
          style={{ marginLeft: 12 }}
        >
          <IonIcon color={colors.white} name="md-close" size={24} />
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <IonIcon.Button
            onPress={() => state.params.handleSubmit()}
            color={colors.black}
            name="md-checkmark"
            size={22}
            backgroundColor={colors.primaryGreen}
            style={{ paddingVertical: 4, borderRadius: 2 }}
          >
            Done
          </IonIcon.Button>
        </View>
      ),
    }
  }

  constructor(props) {
    super(props);
    this.assets = [
      { title: 'NEO', value: 'Neo' },
      { title: 'GAS', value: 'Gas' },
    ];
    this.state = validate(
      {
        address: '',
        asset: 'Neo',
        amount: '',
        messages: {},
        failureMessage: ''
      },
      props.balance
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSubmit: this.handleSubmit });
  }

  componentWillReceiveProps(nextProps) {
    const { response } = nextProps;
    if (response === this.props.response) {
      return;
    }
    if (response.error) {
      this.setState({ failureMessage: response.error.message || 'Something went wrong processing this transaction' });
    } else {
      Toast.show('Transaction complete! Your balance will update when the blockchain has processed it', {
        duration: 6000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        backgroundColor: colors.primaryGreen,
        textColor: colors.black
      });
       this.props.navigation.dispatch(NavigationActions.back());
    }
  }

  handleChange = update => {
    this.setState(state => {
      return validate({ ...state, ...update }, this.props.balance)
    });
  }

  handleSubmit = () => {
    const { address, asset, amount, valid } = this.state;
    if (valid) {
      this.props.navigation.navigate('SendConfrm', { address, asset, amount });
    } else {
      this.setState({ showMessages: true });
    }
  }

  render() {
    const { address, asset, amount, showMessages, messages, failureMessage } = this.state;

    return (
      <KeyboardAwareScrollView style={styles.screenContainer}>
        <Spinner visible={this.props.sending} overlayColor="rgba(14, 18, 22, 0.89)"/>
        {!!failureMessage &&
          <View style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: colors.orange, padding: 7 }}>
            <Text style={{ color: colors.orange }}>Transaction failed. {failureMessage}</Text>
          </View>
        }

        <View style={{ marginTop: 20 }}>
          <Text>Public Address</Text>
        </View>

        <TextInput
          placeholder="Enter the address to send to"
          value={address}
          onChangeText={text => this.handleChange({ address: text.trim() })}
          returnKeyType="done"
        />
        {showMessages && !!messages.address &&
          <Animatable.View animation="fadeIn">
            <Text style={{ color: colors.orange, marginTop: 0 }}>{messages.address}</Text>
          </Animatable.View>
        }

        <View style={{ marginTop: 20 }}>
          <Text>Asset</Text>
        </View>

        <View style={
          {
            marginTop: 10,
            flex: 1,
            flexDirection: 'row',
            borderBottomColor: colors.grey,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 10
          }
        }>
          <InlineButton
            onPress={() => this.handleChange({ asset: 'Neo' })}
          >
            <Text style={asset === 'Neo' ? selectedAssetStyle : assetStyle}>
              NEO
            </Text>
          </InlineButton>
          <Text style={{ color: colors.halfGrey }}>/</Text>
          <InlineButton
            onPress={() => this.handleChange({ asset: 'Gas' })}
          >
            <Text style={asset === 'Gas' ? selectedAssetStyle : assetStyle}>
              GAS
            </Text>
          </InlineButton>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>Amount</Text>
        </View>

        <TextInput
          placeholder="Enter the amount to send"
          value={this.state.amount}
          keyboardType="numeric"
          onChangeText={text => this.handleChange({ amount: text.trim() })}
          returnKeyType="done"
        />
        {showMessages && !!messages.amount &&
          <Animatable.View animation="fadeIn">
            <Text style={{ color: colors.orange, marginTop: 0 }}>{messages.amount}</Text>
          </Animatable.View>
        }
      </KeyboardAwareScrollView>
    );
  }
}

const selectedAssetStyle = {
  color: colors.primaryGreen,
  fontSize: 16,
};

const assetStyle = {
  color: colors.grey,
  fontSize: 16,
};

const mapStateToProps = state => {
  return {
    balance: state.data.wallet.balance,
    ...state.sendScreen,
  };
}

export default connect(mapStateToProps)(SendScreen);
