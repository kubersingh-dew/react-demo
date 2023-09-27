import {ToastAndroid, Platform, AlertIOS} from 'react-native';

export const webClientId =
  '39583862096-6lejbtm8ga44qjacjot20tunuf3irban.apps.googleusercontent.com';
export const LoginType = {
  google: 'google',
  email: 'email',
  firebase: 'firebase',
};

export function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
}
