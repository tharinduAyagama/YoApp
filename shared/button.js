import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const FlatButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 50,
    width: 200,
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
});

export default FlatButton;
