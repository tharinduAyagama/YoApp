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
  ColorPropType,
} from 'react-native';
import {commenStyles} from '../styles/globleStyles';
import FlatButton from '../shared/button';
import Header from '../shared/Header';

const Register = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const addDB = () => {
    if (name.length > 3 && mobileNumber.length == 9) {
      firestore().collection('Users').add({name: name, mobile: mobileNumber});
      setName('');
      setMobileNumber('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.content}>
          <View style={styles.inputCotainer}>
            <Text style={commenStyles.feildText}>Name</Text>
            <TextInput
              placeholder="e.g: Mark"
              style={commenStyles.input}
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
            <FlatButton title={'Login'} onPress={addDB}></FlatButton>
          </View>
          <Text>
            {name} {mobileNumber}
          </Text>
        </View>
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
    backgroundColor: 'red',
    height: 75,
    width: '100%',
  },
  container: {
    backgroundColor: '#ead1dc',
    flex: 1,
  },
});

export default Register;
