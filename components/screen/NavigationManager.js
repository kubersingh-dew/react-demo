import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import VideoScreen from './VideoScreen';
import {StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import DrawerView from './DrawerView';
import {notifyMessage} from '../utils/Constants';

//const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationManager = () => {
  const openDrawer = () => {
    //drawer.current.openDrawer();
    notifyMessage('Clicked');
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerView {...props} />}
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Welcome',
            headerRight: () => (
              <Button
                icon={{name: 'settings', type: 'Ionicons'}}
                size={40}
                buttonStyle={styles.settingButton}
                onPress={() => openDrawer()}
              />
            ),
          }}
        />
        <Drawer.Screen name="Player" component={VideoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  settingButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
});

export default NavigationManager;
