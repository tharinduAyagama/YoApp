import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Home from './screens/Home';
import Chat from './screens/Chat';
import Register from './screens/Register';
import AddFriend from './screens/AddFriend';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {/* <Chat /> */}
      <Home />
      {/* <Register /> */}
      {/* <AddFriend /> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
