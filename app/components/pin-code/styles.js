import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -99,
  },
  pinBox: {
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: colors.grey,
    height: 30,
    width: 30,
    marginRight: 14,
    justifyContent: 'center'
  },
  pinBoxList: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pinView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  pinPromptText: {
    color: colors.white,
    marginBottom: 10,
  }
});
