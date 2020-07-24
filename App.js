import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import Home from './screens/Home';
const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
