import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export const CHEVRON_SIZE = 25;

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopColor: colors.halfGrey,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.halfGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
  },
  email: {
    fontSize: 13,
    color: colors.subtleText,
  },
  separator: {},
  chevronContainer: {
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  chevron: {
    alignSelf: 'flex-end',
  },
});

