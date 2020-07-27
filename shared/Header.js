import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>YoChat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#8FBC8F',
  },

  headerText: {
    fontWeight: 'bold',
    color: '#2F4F4F',
    fontFamily: 'Arial',
    textAlign: 'center',
    fontSize: 40,
  },
});

export default Header;
