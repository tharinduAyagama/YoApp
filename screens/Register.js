import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {commenStyles} from '../styles/globleStyles';
import FlatButton from '../shared/button';
import Header from '../shared/Header';

const Register = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [pin, setPin] = useState('');

  async function Login() {
    const mobileDB = '+94' + mobileNumber;
    //firestore().collection('Users').add({name: name, mobile: mobileDB});
    const confirmation = await auth().signInWithPhoneNumber(mobileDB);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const x = await confirm.confirm(pin);
      console.warn(x.user.phoneNumber);
    } catch (error) {
      console.log('Invalid code.');
      console.warn(error.code);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        {confirm ? (
          <View style={styles.content}>
            <View style={styles.inputCotainer}>
              <TextInput
                keyboardType={'numeric'}
                style={commenStyles.input}
                placeholder="enter pin"
                value={pin}
                onChangeText={(val) => setPin(val)}
              />
            </View>
            <View style={styles.buttonConainer}>
              <FlatButton title={'Confirm'} onPress={confirmCode} />
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.inputCotainer}>
              <Text style={commenStyles.feildText}>Name</Text>
              <TextInput
                placeholder="e.g: Mark"
                style={commenStyles.input}
                value={name}
                onChangeText={(val) => setName(val)}
              />
            </View>
            <View style={styles.inputCotainer}>
              <Text style={commenStyles.feildText}>Mobile Number</Text>
              <View style={styles.numberInput}>
                <Text style={styles.staticPart}>+94</Text>
                <TextInput
                  style={{
                    ...commenStyles.input,
                    paddingLeft: 32,
                  }}
                  value={mobileNumber}
                  onChangeText={(val) => setMobileNumber(val)}
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <View style={styles.buttonConainer}>
              <FlatButton title={'Login'} onPress={Login}></FlatButton>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staticPart: {
    marginLeft: 6,
    marginRight: -30,
  },
  inputCotainer: {
    width: '80%',
  },
  buttonConainer: {
    marginTop: 20,
  },
  headerContainer: {
    height: 75,
    width: '100%',
  },
  container: {
    backgroundColor: 'wheat',
    flex: 1,
  },
});

export default Register;
