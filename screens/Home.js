import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Header from '../shared/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Home = () => {
  const add = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.plusIconContainer}>
        <TouchableOpacity onPress={add}>
          <View style={styles.addContainer}>
            <FontAwesome5
              name={'plus'}
              size={40}
              style={styles.plusIcon}></FontAwesome5>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'wheat',
    flex: 1,
  },
  headerContainer: {
    height: 75,
    width: '100%',
  },
  addContainer: {
    marginLeft: 'auto',
    marginRight: 25,
    width: 40,
    height: 40,
  },
  plusIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
  },
  plusIconContainer: {
    marginBottom: 25,
    marginTop: 'auto',
  },
});

export default Home;
