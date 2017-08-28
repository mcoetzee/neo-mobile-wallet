import React from 'react';
import { NavigationActions } from 'react-navigation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import styles, { colors } from '../../styles';

export default function BackButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(NavigationActions.back())}
      style={{ marginLeft: 12 }}
    >
      <IonIcon color={colors.white} name="ios-arrow-round-back" size={42} />
    </TouchableOpacity>
  );
}
