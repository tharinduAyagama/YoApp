import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import HomeDrawer from './routes/HomeDrawer';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <HomeDrawer></HomeDrawer>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
