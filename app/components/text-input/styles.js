import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../styles';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    borderBottomColor: colors.grey,
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
  },
  input: {
    width: window.width,
    height: 40,
    color: colors.white,
    paddingRight: 10,
  },
});
