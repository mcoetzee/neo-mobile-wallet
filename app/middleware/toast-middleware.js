import { StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import { colors } from '../styles';

export const toastMiddleware = store => next => action => {
  if (action.meta && action.meta.toast) {
    const { toast } = action.meta;
    if (toast.delay) {
      setTimeout(() => showToast(toast), toast.delay);
    } else {
      showToast(toast);
    }
  }
  return next(action);
};

function showToast(config) {
  const error = config.type === 'error';
  Toast.show(
    config.message,
    {
      duration: 6000,
      position: Toast.positions.BOTTOM,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      containerStyle: {
        backgroundColor: colors.black,
        borderColor: error ? colors.orange : colors.primaryGreen,
        borderWidth: 2,
        borderRadius: 0,
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginHorizontal: 20,
      },
      textColor: error ? colors.orange : colors.primaryGreen,
      shadow: true,
      shadowColor: error ? colors.orange : colors.primaryFaded,
    }
  );
}
