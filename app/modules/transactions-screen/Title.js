import React, { Component } from 'react';
import { View } from 'react-native';
import styles, { colors } from '../../styles';
import Text from '../../components/text';
import { connect } from 'react-redux';
import { HeaderTitle } from 'react-navigation';

function Title(props) {
  return (
    <View style={{ paddingTop: 12, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <HeaderTitle style={{ color: 'white' }}>
        Transactions <Text style={{ color: colors.grey }}>({props.transactions.data.length})</Text>
      </HeaderTitle>
      {props.transactions.updatedAt &&
        <Text type="secondary">Last Updated <Text type="secondary">{props.transactions.updatedAt}</Text></Text>
      }
    </View>
  );
}

const mapStateToProps = state => {
  return {
    transactions: state.data.wallet.transactions
  };
}

export default connect(mapStateToProps)(Title);
