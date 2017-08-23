import React, { Component } from 'react';
import { View } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import { connect } from 'react-redux';
import { HeaderTitle } from 'react-navigation';

function Title(props) {
  return (
    <View style={{ paddingTop: 12, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <HeaderTitle style={{ color: 'white' }}>Home</HeaderTitle>
      {props.balance.updatedAt &&
        <Text type="secondary">Last Updated <Text type="secondary">{props.balance.updatedAt}</Text></Text>
      }
    </View>
  );
}

const mapStateToProps = state => {
  return {
    balance: state.data.wallet.balance
  };
}

export default connect(mapStateToProps)(Title);
