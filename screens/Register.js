import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {commenStyles} from '../styles/globleStyles';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const addDB = () => {
    if (userName.length() > 3 && mobileNumber.length() == 12) {
      firestore()
        .collection('Users')
        .add({name: userName, mobile: mobileNumber});
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.content}>
        <Text style={commenStyles.feildText}>Username</Text>
        <TextInput
          placeholder="e.g: Mark"
          style={commenStyles.input}
          onChangeText={val => setUserName(val)}
        />
        <Text style={commenStyles.feildText}>Mobile Number</Text>
        <TextInput
          style={commenStyles.input}
          value="+94"
          onChangeText={val => setMobileNumber(val)}
          keyboardType={'numeric'}
        />
        <Button title="SignUp" onPress={addDB}></Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default Register;
