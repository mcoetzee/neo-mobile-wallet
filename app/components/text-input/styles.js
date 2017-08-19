import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../styles';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginLeft: 20,
    borderBottomColor: colors.border,
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    marginTop: 15,
  },
  input: {
    width: window.width,
    height: 40,
  },
});