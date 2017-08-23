import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import TextInput from '../../components/text-input';
import Text from '../../components/text';
import Button, { InlineButton } from '../../components/button';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';

export class PublicAddressScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Public Address',
    headerStyle: styles.screenHeader,
    headerTitleStyle: { color: 'white' },
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
              bgColor='white'
              fgColor='black'
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
