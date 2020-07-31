import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {commenStyles} from '../styles/globleStyles';
import FlatButton from '../shared/button';
import Header from '../shared/Header';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddFriend = ({navigation, route}) => {
  const {myNumber} = route.params;
  const {myName} = route.params;
  const [mobileNumber, setMobileNumber] = useState('');
  console.log(myName);

  const add = () => {
    if (mobileNumber.length == 9) {
      firestore()
        .collection('Users')
        .doc('+94' + mobileNumber)
        .get()
        .then((res1) => {
          if (res1.data() == undefined) {
            console.log('user not registered in the system');
            Alert.alert('Oops', 'This number is not registered', [
              {cancelable: false},
            ]);
          } else {
            console.log('user registered in the system');
            firestore()
              .collection('Users')
              .doc(myNumber)
              .collection('Friends')
              .doc('+94' + mobileNumber)
              .get()
              .then((res2) => {
                if (res2.data() == undefined) {
                  console.log('not in my list');
                  firestore()
                    .collection('Users')
                    .doc(myNumber)
                    .collection('Friends')
                    .doc('+94' + mobileNumber)
                    .set({
                      name: res1.data().name,
                      mobileNumber: '+94' + mobileNumber,
                      chatId: `${myNumber}_${res1.data().mobileNumber}`,
                    });

                  firestore()
                    .collection('Users')
                    .doc('+94' + mobileNumber)
                    .collection('Friends')
                    .doc(myNumber)
                    .set({
                      name: myName,
                      mobileNumber: myNumber,
                      chatId: `${myNumber}_${res1.data().mobileNumber}`,
                    });
                } else {
                  console.log('already in my list');
                  Alert.alert('', 'This number is already in your chat list', [
                    {cancelable: false},
                  ]);
                }
              });
          }
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <AntDesign
              name={'arrowleft'}
              size={30}
              color={'#2F4F4F'}
              style={{marginLeft: 10}}></AntDesign>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              marginLeft: -40,
              zIndex: -1,
            }}>
            <Header title="Add Friend"></Header>
          </View>
        </View>
        <View style={styles.content}>
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
    alignItems: 'center',
    backgroundColor: '#8FBC8F',
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
  container: {
    backgroundColor: '#2F4F4F',
    flex: 1,
  },
});

export default AddFriend;
