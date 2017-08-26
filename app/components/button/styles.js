import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const primary = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderColor: colors.primaryGreen,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent'
  },
  text: {
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.primaryGreen,
    fontSize: 14,
    fontWeight: '500',
  },
});

const dflt = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent'
  },
  text: {
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.primaryGreen,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default { primary, 'default': dflt }
