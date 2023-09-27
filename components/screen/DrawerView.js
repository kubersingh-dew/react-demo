import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import LoginTypeDialog from '../ui/LoginTypeDialog';
import {useSelector, useDispatch} from 'react-redux';
import {initialLoginState} from '../storage/redux/userlogin/UserLoginReducer';
import {setUserSignOut} from '../storage/redux/userlogin/UserLoginActions';
import auth from '@react-native-firebase/auth';
import SignUpView from '../ui/SignUpView';
import {LoginType, notifyMessage} from '../utils/Constants';

const DrawerView = props => {
  const loginInfo = useSelector(state => state.UserLoginReducer);
  const dispatch = useDispatch();
  const [isTypeDialogVisible, setTypeDialogVisible] = useState(false);
  const [isSignUpDialogVisible, setSignUpDialogVisible] = useState(false);
  const [loginStatus, setLoginStatus] = useState(initialLoginState);

  useEffect(() => {
    setLoginStatus(loginInfo);
  }, [loginInfo]);

  const openLoginTypeDialog = () => {
    setTypeDialogVisible(true);
  };

  const userSignOut = () => {
    if (loginInfo.data.logintype === LoginType.firebase) {
      auth()
        .signOut()
        .then(() => {
          notifyMessage('User signed out!');
          dispatch(setUserSignOut());
        });
    }
  };

  const closeLoginTypeDialog = () => {
    setTypeDialogVisible(false);
  };

  const closeSignUpDialog = () => {
    setSignUpDialogVisible(false);
  };

  const handleEmailSignUp = () => {
    setSignUpDialogVisible(true);
  };

  return (
    <DrawerContentScrollView {...props}>
      <LoginTypeDialog
        isVisible={isTypeDialogVisible}
        onClose={closeLoginTypeDialog}
        onEmailSignUp={handleEmailSignUp}
        loginInfo={loginStatus}
      />
      <SignUpView
        isVisible={isSignUpDialogVisible}
        onClose={closeSignUpDialog}
      />
      <View style={styles.drawerContainer}>
        <View style={styles.topUserContainer}>
          {loginStatus.IsLogin ? (
            <View>
              {loginStatus.data.image === null ? (
                <Icon name="supervised-user-circle" size={150} color="white" />
              ) : (
                <Image
                  source={{uri: loginStatus.data.image}}
                  style={styles.profileImg}
                />
              )}
              <Text style={styles.email}>{loginStatus.data.email}</Text>
              <TouchableOpacity onPress={() => userSignOut()}>
                <Text style={styles.headerLogin}>SignOut</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Icon name="supervised-user-circle" size={150} color="white" />
              <TouchableOpacity onPress={() => openLoginTypeDialog()}>
                <Text style={styles.headerLogin}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.itemContainer}>
          <Icon name="notifications" size={30} color="gray" />
          <Text style={styles.itemText}>Notifications</Text>
          <Badge
            containerStyle={styles.badgeStyle}
            value={4}
            status={'primary'}
          />
        </View>
        <View style={styles.itemContainer}>
          <Icon name="history" size={30} color="gray" />
          <Text style={styles.itemText}>History</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flexDirection: 'column',
  },
  topUserContainer: {
    flexDirection: 'column',
    backgroundColor: '#000435',
    padding: 15,
    marginBottom: 10,
  },
  headerLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 20,
    paddingEnd: 20,
    margin: 10,
    width: 'auto',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  badgeStyle: {
    marginStart: -3,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    verticalAlign: 'bottom',
    marginStart: 5,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    alignSelf: 'center',
  },
  email: {
    color: 'white',
    alignSelf: 'center',
    padding: 10,
  },
});

export default DrawerView;
