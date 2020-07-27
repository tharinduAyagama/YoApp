import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import Header from '../shared/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';

const Home = ({myNumber}) => {
  const [friendList, setFriendList] = useState([]);
  const add = () => {};

  useEffect(() => {
    const subscriber = firestore()
      .collection('Friends')
      .where('userNumber', '==', '+94714375309')
      .onSnapshot((querySnapshot) => {
        const friends = [];
        querySnapshot.forEach((documentSnapshot) => {
          friends.push(documentSnapshot.data());
        });
        setFriendList(friends);
      });
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View>
        <FlatList
          data={friendList}
          renderItem={({item}) => (
            <View style={styles.friendItem}>
              <View style={styles.picture}></View>
              <Text style={styles.friendText}>{item.friendName}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.plusIconContainer}>
        <TouchableOpacity onPress={add}>
          <View style={styles.addContainer}>
            <FontAwesome5
              color="#8FBC8F"
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
    backgroundColor: '#2F4F4F',
    flex: 1,
  },
  headerContainer: {
    height: 75,
    width: '100%',
  },
  addContainer: {
    justifyContent: 'center',
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
  friendItem: {
    flexDirection: 'row',
    padding: 5,
    height: 80,
    flex: 1,
    alignItems: 'center',
    borderBottomColor: '#8FBC8F',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  friendText: {
    color: '#111222',
    fontWeight: 'bold',
    fontSize: 25,
  },
  picture: {
    marginRight: 15,
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});

export default Home;
