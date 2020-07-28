import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../shared/Header';
import {commenStyles} from '../styles/globleStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import DeleteMessage from '../shared/deleteMessage';

const Chat = () => {
  const [myChat, setMyChat] = useState('');
  const [wholeChat, setWholeChat] = useState('');
  const myNumber = '+94711387163';
  const friendNumber = '+94714375309';
  const scrollViewRef = useRef();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(myNumber)
      .collection('Chats')
      .where('from', 'in', [myNumber, friendNumber])
      .onSnapshot((querySnapshot) => {
        const chats = [];
        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            chats.push({...documentSnapshot.data(), id: documentSnapshot.id});
          });
          chats.sort((a, b) => a.time - b.time);
          setWholeChat(chats);
        }
      });
    return () => subscriber();
  }, []);

  const addChat = () => {
    firestore().collection('Users').doc(myNumber).collection('Chats').add({
      from: myNumber,
      to: friendNumber,
      msg: myChat,
      time: Date.now(),
      delete: 'false',
    });
    firestore().collection('Users').doc(friendNumber).collection('Chats').add({
      from: myNumber,
      to: friendNumber,
      msg: myChat,
      time: Date.now(),
      delete: 'false',
    });
    setMyChat('');
  };

  const deleteMessage = (from, id) => {
    firestore()
      .collection('Users')
      .doc(from)
      .collection('Chats')
      .doc(id)
      .update({delete: 'true'});
  };

  const aleartPopup = (from, id) => {
    Alert.alert('msg', 'ndmd', [
      {
        text: 'delete',
        onPress: () => {
          deleteMessage(from, id);
        },
      },
      {cancelable: false},
    ]);
  };

  const renderChat = (item) => {
    if (item.delete == 'false') {
      if (item.from == myNumber) {
        return (
          <TouchableOpacity onLongPress={() => aleartPopup(item.from, item.id)}>
            <View style={styles.myMsgContainer}>
              <View style={styles.myMsg}>
                <Text style={styles.myMsgText}>{item.msg}</Text>
                <Text style={styles.myTime}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else if (item.from == friendNumber) {
        return (
          <View style={styles.frindsMsgContainer}>
            <View style={styles.frindsMsg}>
              <Text style={styles.friendsMsgText}>{item.msg}</Text>
              <Text style={styles.friendsTime}>{item.time}</Text>
            </View>
          </View>
        );
      }
    } else if (item.delete == 'true') {
      if (item.from == myNumber) {
        return (
          <View style={styles.myDeleteMessageContainer}>
            <DeleteMessage></DeleteMessage>
          </View>
        );
      } else if (item.from == friendNumber) {
        return (
          <View style={styles.friendsDeleteMessageContainer}>
            <DeleteMessage></DeleteMessage>
          </View>
        );
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.chatListCotainer}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            <FlatList
              data={wholeChat}
              renderItem={({item}) => renderChat(item)}
            />
          </ScrollView>
        </View>
        <View style={styles.messageCotainer}>
          <View style={styles.inputCotainer}>
            <TextInput
              multiline={true}
              placeholder="Type a message..."
              placeholderTextColor="#222"
              style={commenStyles.input}
              value={myChat}
              onChangeText={(val) => setMyChat(val)}
            />
          </View>
          <TouchableOpacity style={styles.sendContainer} onPress={addChat}>
            <View>
              <MaterialIcons
                name={'send'}
                size={35}
                color={'#8FBC8F'}></MaterialIcons>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  inputCotainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  messageCotainer: {
    alignItems: 'center',
    marginTop: 'auto',
    flexDirection: 'row',
    height: 60,
  },
  sendContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
  myMsg: {
    backgroundColor: '#90EE90',
    padding: 5,
    marginLeft: 'auto',
    marginRight: 10,
    marginBottom: 5,
    borderTopLeftRadius: 10,
  },
  frindsMsg: {
    backgroundColor: '#7FFFD4',
    padding: 5,
    marginRight: 'auto',
    marginLeft: 10,
    marginBottom: 5,
    borderTopRightRadius: 10,
  },
  myMsgText: {
    color: '#222',
    fontSize: 17,
    marginLeft: 'auto',
  },
  myMsgContainer: {
    padding: 4,
    paddingLeft: 80,
  },
  frindsMsgContainer: {
    padding: 4,
    paddingRight: 80,
  },
  friendsMsgText: {
    color: '#222',
    fontSize: 17,
    marginRight: 'auto',
  },
  chatListCotainer: {
    flex: 7,
    padding: 5,
  },
  myTime: {
    color: '#222',
    marginLeft: 'auto',
    fontSize: 12,
  },
  friendsTime: {
    color: '#222',
    fontSize: 12,
  },
  myDeleteMessageContainer: {
    marginLeft: 190,
    borderTopLeftRadius: 10,
    backgroundColor: '#c6dec6',
    margin: 5,
  },
  friendsDeleteMessageContainer: {
    marginRight: 190,
    borderTopRightRadius: 10,
    backgroundColor: 'red',
    margin: 5,
  },
});

export default Chat;
