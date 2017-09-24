import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../../components/text';
import Button from '../../components/button';
import styles, { colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const fiveMinutes = 5 * 60 * 1000;

export default function GasClaimer({ claim, onGasClaim, network }) {
  const disabled = claim.loading || !claim.amount || (
    !!claim.claimedAt &&
    (new Date() - new Date(claim.claimedAt)) < fiveMinutes
  );

  return (
    <View style={{ paddingTop: 20, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          type="primary"
          disabled={disabled}
          onPress={() => onGasClaim(network)}
          busy={claim.claiming && 'Claiming...'}
        >
          Claim {claim.amount} GAS
        </Button>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Animatable.View duration={1000} transition="opacity" style={{ opacity: claim.claiming ? 1 : 0 }}>
          <Text type="secondary" style={{ color: colors.primaryFaded }}>{claim.progress}</Text>
        </Animatable.View>
      </View>
    </View>
  );
}
