import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import Header from '../shared/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';

const Home = ({myNumber}) => {
  const [friendList, setFriendList] = useState([]);
  const add = () => {};

  const x = ['ddd', 'dsdsf'];

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
            <View
              style={{
                height: 50,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Friend:{item.friendName}</Text>
            </View>
          )}
        />
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
