import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../shared/Header';
import auth from '@react-native-firebase/auth';

const DrawerScreen = () => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Header title={'YoChat'}></Header>
    </View>
    <TouchableOpacity style={styles.itemProfile}>
      <Text style={styles.itemText}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.itemLogout}
      onPress={() => {
        auth().signOut();
      }}>
      <Text style={styles.itemText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemProfile: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#8FBC8F',
    height: 45,
  },
  itemLogout: {
    marginTop: 'auto',
    margin: 8,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8FBC8F',
    height: 45,
  },
  itemText: {
    color: '#8FBC8F',
    fontSize: 20,
  },
  headerContainer: {
    height: 50,
  },
});

export default DrawerScreen;
