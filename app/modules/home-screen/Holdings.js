import React from 'react';
import { View } from 'react-native';
import Text from '../../components/text';
import screenStyles from './styles';

export default function Holdings({ balance, markets }) {
  const neoTotal = balance.neo && markets.neo.price_usd
    ? (balance.neo * parseFloat(markets.neo.price_usd))
    : 0;
  const gasTotal = balance.gas && markets.gas.price_usd
    ? (balance.gas * parseFloat(markets.gas.price_usd))
    : 0;

  const total = neoTotal + gasTotal;

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 150 }}>
          <Text type="primary" style={screenStyles.symbol}>NEO</Text>
          <Text style={screenStyles.amount}>{balance.neo}</Text>
          <Text type="secondary" style={{ textAlign: 'center' }}>
            US ${neoTotal ? neoTotal.toFixed(2).toString() : '-'}
          </Text>
        </View>
        <View style={{ width: 150 }}>
          <Text type="primary" style={screenStyles.symbol}>GAS</Text>
          <Text style={screenStyles.amount}>{balance.gas && balance.gas.toFixed(3)}</Text>
          <Text type="secondary" style={{ textAlign: 'center' }}>
            US ${gasTotal ? gasTotal.toFixed(2).toString() : '-'}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <Text type="secondary" style={screenStyles.symbol}>
          US ${total ? total.toFixed(2).toString() : '-'}
        </Text>
      </View>
    </View>
  );
}
