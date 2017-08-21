import { StyleSheet, Dimensions, Platform } from 'react-native';

export const colors = {
  primaryGreen: '#8fd700',
  black: '#0e1216',
  white: '#fff',
  grey: 'rgb(136, 136, 136)',
  halfGrey: 'rgba(136, 136, 136, 0.3)',
  border: '#cccccc',
  grayBackground: '#f9fafb',
  rowUnderlay: 'rgba(154, 154, 154, 0.25)',
};

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 64,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.black
  },
  screenHeader: {
    backgroundColor: colors.black
  },
  transparentScreenHeader: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  }
});
