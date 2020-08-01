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

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [pin, setPin] = useState('');

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.phoneNumber);
        navigation.navigate('HomeStack', {
          screen: 'Home',
          params: {myNumber: user.phoneNumber},
        });
      } else {
        console.log('no user');
        setConfirm(null);
        navigation.navigate('LoginStack', {
          screen: 'Register',
        });
      }
    });
  }, []);

  async function Login() {
    const confirmation = await auth().signInWithPhoneNumber(
      '+94' + mobileNumber,
    );
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const x = await confirm.confirm(pin);
      console.warn(x.user.phoneNumber);
      firestore()
        .collection('Users')
        .doc('+94' + mobileNumber)
        .get()
        .then((res) => {
          if (res.data() == undefined) {
            console.log('no user record found');
            firestore()
              .collection('Users')
              .doc('+94' + mobileNumber)
              .set({
                name: name,
                mobileNumber: '+94' + mobileNumber,
                description: 'Hey there! I am using YoChat',
              });
            navigation.navigate('HomeStack', {
              screen: 'Home',
              params: {myNumber: '+94' + mobileNumber, myName: name},
            });
          } else {
            console.log('Already has user');
            navigation.navigate('HomeStack', {
              screen: 'Home',
              params: {myNumber: '+94' + mobileNumber, myName: name},
            });
          }
        });
      console.log(user);
    } catch (error) {
      console.log('Invalid code.');
      console.warn(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header title="YoApp" />
        </View>
        {confirm ? (
          <View style={styles.content}>
            <View style={styles.inputCotainer}>
              <TextInput
                keyboardType={'numeric'}
                style={commenStyles.input}
                placeholder="enter pin"
                placeholderTextColor="#222"
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
              <Text style={{...commenStyles.feildText, color: '#8FBC8F'}}>
                Name
              </Text>
              <TextInput
                style={commenStyles.input}
                placeholder="e.g. Mark"
                placeholderTextColor="#222"
                value={name}
                onChangeText={(val) => setName(val)}
              />
            </View>
            <View style={styles.inputCotainer}>
              <Text style={{...commenStyles.feildText, color: '#8FBC8F'}}>
                Mobile Number
              </Text>
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
    zIndex: 1,
    color: '#222',
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
    backgroundColor: '#2F4F4F',
    flex: 1,
  },
});

export default Register;
