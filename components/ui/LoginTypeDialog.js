/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SocialIcon} from 'react-native-elements/dist/social/SocialIcon';
import Modal from 'react-native-modal';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUserLoginInfo} from '../storage/redux/userlogin/UserLoginActions';
import {LoginType, notifyMessage, webClientId} from '../utils/Constants';

const LoginTypeDialog = ({isVisible, onClose, onEmailSignUp, loginInfo}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authValue = auth();

  GoogleSignin.configure({
    webClientId: webClientId,
  });

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      notifyMessage('Email & Password Required');
    } else {
      signInWithEmail(username, password);
    }
  };

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_login = authValue.signInWithCredential(googleCredential);
    user_login
      .then(data => {
        updateUserData(data.user);
      })
      .catch(error => {
        notifyMessage('Something went wrong!');
        console.log(error);
      });
  }

  function onAuthStateChanged(user) {
    console.log(user);
    /*if (user != null && !loginInfo.IsLogin) {
      updateUserData(user);
    }*/
  }

  function updateUserData(user) {
    if (user.emailVerified) {
      dispatch(
        setUserLoginInfo({
          logintype: LoginType.firebase,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        }),
      );
      notifyMessage('Sign In!');
      close();
    } else {
      notifyMessage('Email-Id is not Verified');
    }
  }

  useEffect(() => {
    const subscriber = authValue.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function signInWithEmail(email, pass) {
    authValue
      .signInWithEmailAndPassword(email, pass)
      .then(data => {
        updateUserData(data.user);
      })
      .catch(error => {
        if (error.code === 'auth/unverified-email') {
          notifyMessage('Email is not Verified');
        }
        if (error.code === 'auth/invalid-email') {
          notifyMessage('Invalid Email-Id');
        }
        if (error.code === 'auth/invalid-login') {
          notifyMessage('Wrong Email/Password');
        }
        console.log(error);
      });
  }

  function close() {
    setUsername('');
    setPassword('');
    onClose();
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.conatiner}>
        <View style={styles.toplayer}>
          <Text style={{flex: 1}}>Login by Email :</Text>
          <TouchableOpacity onPress={close}>
            <Icon
              style={styles.closeicon}
              name="close"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.textview}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.textview}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity style={styles.itemTouchView} onPress={handleLogin}>
            <View style={styles.itemView}>
              <SocialIcon name="email" raised={false} iconSize={15} />
              <Text style={styles.itemBtn}>Login</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.signupView}>
            <Text style={{padding: 5}}>Don't have an account? </Text>
            <Pressable onPress={onEmailSignUp}>
              <Text style={styles.signup}>SignUp</Text>
            </Pressable>
          </View>
         {/* <View style={styles.signupView} >
            <Text style={{padding: 5}}>Email-Id is not Verified </Text>
            <Pressable onPress={onEmailSignUp}>
              <Text style={styles.signup}>Send Mail</Text>
            </Pressable>
          </View>*/}
        </View>
        <View style={styles.divider} />
        <Text>Social Login :</Text>
        <TouchableOpacity
          style={styles.itemTouchView}
          onPress={onGoogleButtonPress}>
          <View style={styles.itemView}>
            <SocialIcon type="google" raised={false} iconSize={15} />
            <Text style={styles.itemBtn}>By Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textview: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  signupView: {
    marginTop: 5,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  signup: {
    padding: 5,
    color: '#3778fa',
  },
  conatiner: {
    flexDirection: 'column',
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  itemTouchView: {
    backgroundColor: '#000435',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  itemView: {
    flexDirection: 'row',
  },
  itemBtn: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    marginStart: -60,
    fontSize: 15,
  },
  toplayer: {
    flexDirection: 'row',
  },
  closeicon: {
    marginTop: -5,
    alignSelf: 'space-evenly',
  },
  divider: {
    marginTop: 10,
    marginBottom: 20,
    height: 1,
    backgroundColor: 'gray',
  },
});

export default LoginTypeDialog;
