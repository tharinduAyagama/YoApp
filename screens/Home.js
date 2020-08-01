import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../shared/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation, route}) => {
  const {myNumber} = route.params;
  const [friendList, setFriendList] = useState([]);

  let myName = '';

  firestore()
    .collection('Users')
    .doc(myNumber)
    .get()
    .then((res) => {
      myName = res.data().name;
      console.log(myName);
    });

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(myNumber)
      .collection('Friends')
      .onSnapshot((querySnapshot) => {
        const friends = [];
        querySnapshot.forEach((documentSnapshot) => {
          friends.push({...documentSnapshot.data(), id: documentSnapshot.id});
        });
        console.log('qqqqqqqqqqqqqqqqqqq');
        console.log(friends);
        setFriendList(friends);
      });
    return () => subscriber();
  }, []);

  const alertPopup = (friendMobile, friendName) => {
    Alert.alert(friendName, '', [
      {
        text: 'info',
        onPress: () => {
          showInfo(friendMobile);
        },
      },
      {cancelable: false},
    ]);
  };

  const showInfo = (friendMobile) => {
    Alert.alert('Chat info', `Number:-  ${friendMobile}`, [
      {cancelable: false},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={{
            zIndex: 1,
            marginRight: -40,
            marginLeft: 8,
          }}>
          <Feather color="#2F4F4F" name={'menu'} size={40}></Feather>
        </TouchableOpacity>
        <View style={{marginLeft: -8, width: '100%'}}>
          <Header title="YoChat" />
        </View>
      </View>
      <View>
        <FlatList
          data={friendList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chat', {
                  myNumber: myNumber,
                  friendNumber: item.mobileNumber,
                  friendName: item.name,
                  chatId: item.chatId,
                });
              }}
              onLongPress={() => {
                alertPopup(item.mobileNumber, item.name);
              }}>
              <View style={styles.friendItem}>
                <View style={styles.picture}></View>
                <Text style={styles.friendText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.plusIconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddFriend', {
              myNumber: myNumber,
              myName: myName,
            });
          }}>
          <View style={styles.addContainer}>
            <FontAwesome
              color="#8FBC8F"
              name={'user-plus'}
              size={40}
              style={styles.plusIcon}></FontAwesome>
            {/* <AntDesign
              color="#8FBC8F"
              name={'pluscircle'}
              size={40}
              style={styles.plusIcon}></AntDesign> */}
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
    alignItems: 'center',
    flexDirection: 'row',
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
    color: '#8FBC8F',
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
