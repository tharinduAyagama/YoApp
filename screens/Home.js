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
import AntDesign from 'react-native-vector-icons/AntDesign';
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

  const alertPopup = (id, friendNumber, friendName) => {
    Alert.alert(friendName, '', [
      {
        text: 'info',
        onPress: () => {
          showInfo(friendNumber);
        },
      },
      {
        text: 'delete',
        onPress: () => {
          deleteAlert(id);
        },
      },
      {cancelable: false},
    ]);
  };

  const deleteAlert = (id) => {
    Alert.alert(
      'Delete Warning',
      'Are u sure that you want to delete this chat?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteChat(id);
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const deleteChat = (id) => {
    firestore().collection('Friends').doc(id).delete();
  };

  const showInfo = (friendNumber) => {
    Alert.alert('Chat info', friendNumber, [{cancelable: false}]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="YoChat" />
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
                });
              }}
              // onLongPress={() => {
              //   alertPopup(item.id, item.friendNumber, item.friendName);
              // }}
            >
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
            <AntDesign
              color="#8FBC8F"
              name={'pluscircle'}
              size={40}
              style={styles.plusIcon}></AntDesign>
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
