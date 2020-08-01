import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const DeleteMessage = ({msgContent}) => (
  <View style={styles.textCotainer}>
    <Text style={styles.deleteMessageText}>{msgContent}</Text>
  </View>
);

const styles = StyleSheet.create({
  textCotainer: {
    padding: 4,
    justifyContent: 'center',
    height: 30,
    marginLeft: 'auto',
  },
  deleteMessageText: {
    color: '#222',
    fontSize: 17,
  },
});

export default DeleteMessage;
