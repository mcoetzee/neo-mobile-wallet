import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles, { colors } from '../../styles';
import TextInput from '../../components/text-input';
import Text from '../../components/text';
import Button, { BackButton, InlineButton } from '../../components/button';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';

export class PublicAddressScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { dispatch } = navigation;
    return {
      headerTitle: 'Public Address',
      headerStyle: styles.screenHeader,
      headerTitleStyle: { color: colors.white },
      headerLeft: (
        <BackButton navigation={navigation} />
      ),
    };
  }

  render() {
    return (
      <ScrollView style={styles.screenContainer}>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <View>
            <Text>{this.props.address.public}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <QRCode
              value={this.props.address.public}
              size={250}
              bgColor={colors.white}
              fgColor={colors.black}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.data.wallet.address,
    network: state.data.network,
  };
}

export default connect(mapStateToProps)(PublicAddressScreen);
