import React from 'react';
import { View } from 'react-native';
import Text from '../../components/text';
import { colors } from '../../styles';

const textStyle = {
  fontSize: 10,
  color: colors.grey,
  marginTop: 5,
};

export default function Markets({ neo, gas }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ width: '33%' }}>
        <Text style={textStyle}></Text>
        <Text style={textStyle}>Price USD</Text>
        <Text style={textStyle}>Price BTC</Text>
        <Text style={textStyle}>Market Cap</Text>
        <Text style={textStyle}>% Change 1h</Text>
        <Text style={textStyle}>% Change 24h</Text>
        <Text style={textStyle}>% Change 7d</Text>
      </View>
      <View style={{ width: '33%' }}>
        <Text style={[textStyle, { color: 'white' }]}>NEO</Text>
        <Text style={textStyle}>{neo.price_usd}</Text>
        <Text style={textStyle}>{neo.price_btc}</Text>
        <Text style={textStyle}>{neo.market_cap_usd}</Text>
        <Text style={textStyle}>{neo.percent_change_1h}%</Text>
        <Text style={textStyle}>{neo.percent_change_24h}%</Text>
        <Text style={textStyle}>{neo.percent_change_7d}%</Text>
      </View>
      <View style={{ width: '33%' }}>
        <Text style={[textStyle, { color: 'white' }]}>GAS</Text>
        <Text style={textStyle}>{gas.price_usd}</Text>
        <Text style={textStyle}>{gas.price_btc}</Text>
        <Text style={textStyle}>{gas.market_cap_usd}</Text>
        <Text style={textStyle}>{gas.percent_change_1h}%</Text>
        <Text style={textStyle}>{gas.percent_change_24h}%</Text>
        <Text style={textStyle}>{gas.percent_change_7d}%</Text>
      </View>
    </View>
  );
}
