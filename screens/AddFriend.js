import React, {useState, useEffect} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddFriend = ({navigation, myNumber}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const add = () => {
    if (name.length > 3 && mobileNumber.length == 9) {
      firestore()
        .collection('Friends')
        .add({
          userNumber: '+94714375309',
          friendNumber: `+94${mobileNumber}`,
          friendName: name,
        });
      navigation.navigate('Home', '+94714375309');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.backButton}>
            <AntDesign name={'arrowleft'} size={40} color={'black'}></AntDesign>
          </View>
          <View style={styles.stringPart}>
            <Header title="Add Friend"></Header>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.inputCotainer}>
            <Text style={commenStyles.feildText}>Name</Text>
            <TextInput
              placeholder="e.g: Mark"
              placeholderTextColor="#222"
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
  headerContainer: {
    margin: 10,
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 64,
    width: '100%',
  },
  inputCotainer: {
    width: '80%',
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staticPart: {
    color: '#222',
    zIndex: 1,
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
    backgroundColor: '#2F4F4F',
    flex: 1,
  },
  backButton: {backgroundColor: 'yellow'},
  stringPart: {backgroundColor: 'green', padding: 5},
});

export default AddFriend;
