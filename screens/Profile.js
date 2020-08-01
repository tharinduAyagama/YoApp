import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../shared/Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-gesture-handler';
import {commenStyles} from '../styles/globleStyles';

const Profile = ({navigation}) => {
  const authUser = auth().currentUser;
  let number = authUser.phoneNumber;
  const [user, setUser] = useState({name: '', desc: '', mobileNumber: ''});
  const [updatingUser, setUpdatingUser] = useState({name: '', desc: ''});
  const [visible, setVisible] = useState(false);
  const [nameEdit, setNameEdit] = useState(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(number)
      .onSnapshot((documentSnapshot) => {
        setUser(documentSnapshot.data());
        setUpdatingUser({
          name: documentSnapshot.data().name,
          desc: documentSnapshot.data().desc,
        });
      });
    return () => subscriber();
  }, []);

  const updateDesc = () => {
    firestore()
      .collection('Users')
      .doc(number)
      .update({desc: updatingUser.desc});
    setVisible(false);
  };

  const updateName = () => {
    firestore()
      .collection('Users')
      .doc(number)
      .update({name: updatingUser.name});
    setVisible(false);
  };

  return (
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
          <Header title="Profile"></Header>
        </View>
      </View>
      <View
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          height: 140,
          width: '35%',
          backgroundColor: 'white',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 100,
        }}></View>
      <View style={styles.detailContainr}>
        <View style={styles.nameContainer}>
          <FontAwesome5
            name={'user'}
            size={40}
            color={'#8FBC8F'}
            style={{}}></FontAwesome5>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 20,
              padding: 8,
              marginRight: 30,
            }}>
            <Text style={{color: '#8FBC8F'}}>{'Name'}</Text>
            <Text style={styles.nameText}>{user.name}</Text>
          </View>
          <MaterialIcons
            name={'edit'}
            size={40}
            color={'#8FBC8F'}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onPress={() => {
              setNameEdit(true);
              setVisible(true);
            }}></MaterialIcons>
        </View>
        <View style={styles.numberContainer}>
          <Ionicons
            name={'call-outline'}
            size={40}
            color={'#8FBC8F'}
            style={{}}></Ionicons>
          <View style={{flexDirection: 'column', marginLeft: 20, padding: 8}}>
            <Text style={{color: '#8FBC8F'}}>{'Number'}</Text>
            <Text style={styles.numberStyle}>{user.mobileNumber}</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <MaterialIcons
            name={'details'}
            size={40}
            color={'#8FBC8F'}
            style={{}}></MaterialIcons>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 20,
              padding: 8,
              marginRight: 30,
            }}>
            <Text style={{color: '#8FBC8F'}}>{'Description'}</Text>
            <Text style={styles.descStyle}>{user.desc}</Text>
          </View>
          <MaterialIcons
            onPress={() => {
              setVisible(true);
              setNameEdit(false);
            }}
            name={'edit'}
            size={40}
            color={'#8FBC8F'}
            style={{marginLeft: 'auto', marginRight: 'auto'}}></MaterialIcons>
        </View>
      </View>
      <Modal transparent={true} visible={visible}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          {nameEdit ? (
            <View style={styles.updateName}>
              <View>
                <Text style={{color: '#8FBC8F'}}>{'Enter your name'}</Text>
              </View>
              <TextInput
                maxLength={20}
                style={commenStyles.input}
                placeholderTextColor="#222"
                value={updatingUser.name}
                onChangeText={(val) =>
                  setUpdatingUser({name: val, desc: updatingUser.desc})
                }
              />
              <View
                style={{
                  flexDirection: 'row',
                  height: 32,
                  width: '100%',
                }}>
                <View style={{flex: 1, marginHorizontal: 24}}>
                  <TouchableOpacity onPress={updateName}>
                    <View style={styles.button}>
                      <Text style={styles.text}>{'Update'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginHorizontal: 24}}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}>
                    <View style={styles.button}>
                      <Text style={styles.text}>{'Cancel'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.updateDesc}>
              <View>
                <Text style={{color: '#8FBC8F'}}>
                  {'Enter your description'}
                </Text>
              </View>
              <TextInput
                maxLength={50}
                style={commenStyles.input}
                placeholderTextColor="#222"
                value={updatingUser.desc}
                onChangeText={(val) =>
                  setUpdatingUser({name: updatingUser.name, desc: val})
                }
              />
              <View
                style={{
                  flexDirection: 'row',
                  height: 32,
                  width: '100%',
                }}>
                <View style={{flex: 1, marginHorizontal: 24}}>
                  <TouchableOpacity onPress={updateDesc}>
                    <View style={styles.button}>
                      <Text style={styles.text}>{'Update'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginHorizontal: 24}}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}>
                    <View style={styles.button}>
                      <Text style={styles.text}>{'Cancel'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2F4F4F',
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#8FBC8F',
    flexDirection: 'row',
    height: 64,
    width: '100%',
  },
  nameContainer: {
    marginRight: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 'auto',
    padding: 5,
    width: '75%',
    height: 60,
  },
  numberContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 'auto',
    padding: 5,
    width: '75%',
    height: 60,
  },
  descriptionContainer: {
    marginRight: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 'auto',
    padding: 5,
    width: '75%',
    height: 60,
  },
  detailContainr: {
    height: '64%',
    margin: 20,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  nameText: {
    width: 168,
    color: '#c6dec6',
    fontSize: 20,
  },
  numberStyle: {
    color: '#c6dec6',
    fontSize: 20,
  },
  descStyle: {
    width: 168,
    color: '#c6dec6',
    fontSize: 15,
  },
  updateDesc: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    width: '100%',
    alignContent: 'center',
    borderRadius: 8,
    backgroundColor: '#8FBC8F',
  },
  text: {
    color: '#222',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    fontSize: 20,
  },
  updateName: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default Profile;
