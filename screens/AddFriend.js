import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import {commenStyles} from '../styles/globleStyles';
import FlatButton from '../shared/button';
import Header from '../shared/Header';
import firestore from '@react-native-firebase/firestore';

const AddFriend = ({myNumber}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const add = () => {
    firestore()
      .collection('Friends')
      .add({myNumber: myNumber, friendNumber: mobileNumber, friendName: name});
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
            <FlatButton title={'Add'} onPress={add}></FlatButton>
          </View>
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
  inputCotainer: {
    width: '80%',
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staticPart: {
    marginLeft: 6,
    marginRight: -30,
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

export default AddFriend;
