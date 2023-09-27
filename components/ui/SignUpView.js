/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SocialIcon} from 'react-native-elements/dist/social/SocialIcon';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import {notifyMessage} from '../utils/Constants';

function SignUpView({isVisible, onClose}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authValue = auth();

  const handleSignUp = () => {
    if (username.trim() === '' || password.trim() === '') {
      notifyMessage('Email & Password Required');
    } else {
      createAccountByEmail(username, password);
    }
  };

  function close(success) {
    if (success) {
      notifyMessage('SignUp successfully, Verify Email-ID');
    } else {
      notifyMessage('Something went wrong!');
    }
    if (authValue.currentUser !== null || authValue.currentUser !== undefined) {
      authValue.signOut();
    }
    clickClose();
  }

  function clickClose() {
    setUsername('');
    setPassword('');
    onClose();
  }

  function createAccountByEmail(email, pass) {
    authValue
      .createUserWithEmailAndPassword(email, pass)
      .then(user => {
        authValue.currentUser
          .sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://react-demo-eedc5.firebaseapp.com',
          })
          .then(() => {
            close(true);
          })
          .catch(error => {
            console.log(error);
            close(false);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          notifyMessage('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          notifyMessage('That email address is invalid!');
        }
        console.log(error);
      });
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.conatiner}>
        <View style={styles.toplayer}>
          <Text style={{flex: 1}}>Login by Email :</Text>
          <TouchableOpacity onPress={clickClose}>
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
          <TouchableOpacity style={styles.itemTouchView} onPress={handleSignUp}>
            <View style={styles.itemView}>
              <SocialIcon name="email" raised={false} iconSize={15} />
              <Text style={styles.itemBtn}>SignUp</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textview: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
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
});

export default SignUpView;
