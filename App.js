import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import Home from './screens/Home';
import Chat from './screens/Chat';
import Register from './screens/Register';
import AddFriend from './screens/AddFriend';
const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
      {/* <Register /> */}
      <AddFriend />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
