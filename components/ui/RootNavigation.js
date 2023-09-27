import {createNavigationContainerRef} from '@react-navigation/native';
//import {StackActions} from '@react-navigation/native';
//import {NavigationActions} from 'react-navigation';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    //const pushAction = StackActions.push(name, params);
    //navigationRef.dispatch(pushAction);
    /*const navigateAction = NavigationActions.navigate({
      routeName: name,
      params: params,
    });*/
    //navigationRef.current.dispatch(navigateAction);
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
