import Toast from 'react-native-root-toast';
import { colors } from './styles';

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
  Toast.show(
    config.message,
    {
      duration: 6000,
      position: Toast.positions.BOTTOM,
      shadow: false,
      animation: true,
      hideOnPress: true,
      backgroundColor: colors.primaryGreen,
      textColor: colors.black
    }
  );
}
