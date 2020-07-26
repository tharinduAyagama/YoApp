import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Header from '../shared/Header';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <TouchableOpacity onPress={add}>
        <View style={styles.addContainer}></View>
      </TouchableOpacity>
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
    width: 50,
    height: 50,
  },
});

export default Home;
