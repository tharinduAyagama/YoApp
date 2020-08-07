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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import DeleteMessage from '../shared/deleteMessage';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Chat = ({navigation, route}) => {
  const {myNumber} = route.params;
  const {friendNumber} = route.params;
  const {friendName} = route.params;
  const {chatId} = route.params;
  const [myChat, setMyChat] = useState('');
  const [wholeChat, setWholeChat] = useState('');
  const [desc, setDesc] = useState('');
  const [margin, setMargin] = useState(0);
  const scrollViewRef = useRef();

  firestore()
    .collection('Users')
    .doc(friendNumber)
    .get()
    .then((res) => {
      setDesc(res.data().desc);
    });

  useEffect(() => {
    firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('Messages')
      .onSnapshot((querySnapshot) => {
        const chats = [];
        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            chats.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          chats.sort((a, b) => a.time - b.time);
          setWholeChat(chats);
        } else {
          console.log('chat is not started yet');
        }
      });
  }, []);

  const addChat = () => {
    if (myChat.length > 0) {
      firestore().collection('Chats').doc(chatId).collection('Messages').add({
        from: myNumber,
        to: friendNumber,
        msg: myChat,
        time: Date.now(),
        delete: 'false',
      });
      setMyChat('');
    }
  };

  const deleteMessage = (id) => {
    firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('Messages')
      .doc(id)
      .update({delete: 'true'});
  };

  const deleteMessagePopup = (id) => {
    Alert.alert(
      'Delete Warning',
      'Are u sue that you want to delete this message?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteMessage(id);
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const showInfo = (msg, time) => {
    Alert.alert(
      'Message info',
      `${msg}\n${moment(time).format('HH:mm')}\n${moment(time).format(
        'DD/MM/YYYY',
      )}`,
      [{cancelable: false}],
    );
  };

  const aleartMyPopup = (from, id, to, time, msg) => {
    Alert.alert('', msg, [
      {
        text: 'delete',
        onPress: () => {
          deleteMessagePopup(id);
        },
      },
      {
        text: 'info',
        onPress: () => {
          showInfo(msg, time);
        },
      },
      {cancelable: false},
    ]);
  };

  const aleartFriendPopup = (time, msg) => {
    Alert.alert('', msg, [
      {
        text: 'info',
        onPress: () => {
          showInfo(msg, time);
        },
      },
      {cancelable: false},
    ]);
  };

  const renderChat = (item) => {
    if (item.delete == 'false') {
      if (item.from == myNumber) {
        return (
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onLongPress={() =>
              aleartMyPopup(item.from, item.id, item.to, item.time, item.msg)
            }>
            <View style={styles.myMsgContainer}>
              <View style={styles.myMsg}>
                <Text style={styles.myMsgText}>{item.msg}</Text>
                <Text style={styles.myTime}>
                  {moment(item.time).format('HH:mm')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else if (item.from == friendNumber) {
        return (
          <TouchableOpacity
            onLongPress={() => aleartFriendPopup(item.time, item.msg)}>
            <View style={styles.frindsMsgContainer}>
              <View style={styles.frindsMsg}>
                <Text style={styles.friendsMsgText}>{item.msg}</Text>
                <Text style={styles.friendsTime}>
                  {moment(item.time).format('HH:mm')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    } else if (item.delete == 'true') {
      if (item.from == myNumber) {
        return (
          <View style={styles.myDeleteMessageContainer}>
            <DeleteMessage msgContent="You deleted this message"></DeleteMessage>
          </View>
        );
      } else if (item.from == friendNumber) {
        return (
          <View style={styles.friendsDeleteMessageContainer}>
            <DeleteMessage msgContent="This message was deleted"></DeleteMessage>
          </View>
        );
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setMargin(0);
      }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <AntDesign
              name={'arrowleft'}
              size={30}
              color={'#2F4F4F'}
              style={{marginLeft: 10}}></AntDesign>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              marginLeft: -40,
              zIndex: -1,
            }}>
            <Header title={friendName}></Header>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 20,
            backgroundColor: '#c6dec6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 15, color: '#2F4F4F'}}>{desc}</Text>
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
        <View style={{...styles.messageCotainer, marginBottom: margin}}>
          <View style={styles.inputCotainer}>
            <TextInput
              multiline={true}
              placeholder="Type a message..."
              placeholderTextColor="#222"
              style={{
                ...commenStyles.input,
                borderRadius: 45,
                paddingLeft: 20,
                paddingRight: 20,
                textAlignVertical: 'center',
              }}
              value={myChat}
              onChangeText={(val) => setMyChat(val)}
            />
          </View>
          <TouchableOpacity style={styles.sendContainer} onPress={addChat}>
            <View>
              <MaterialCommunityIcons
                name={'send-circle'}
                size={45}
                color={'#c6dec6'}></MaterialCommunityIcons>
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
    alignItems: 'center',
    backgroundColor: '#8FBC8F',
    flexDirection: 'row',
    height: 64,
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
  imojiContainer: {
    marginRight: 15,
    marginLeft: -45,
  },
  myMsg: {
    backgroundColor: '#90EE90',
    padding: 5,
    marginLeft: 'auto',
    marginBottom: 5,
    borderTopLeftRadius: 10,
  },
  frindsMsg: {
    backgroundColor: '#7FFFD4',
    padding: 5,
    marginRight: 'auto',
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
    marginLeft: 'auto',
    width: '80%',
  },
  frindsMsgContainer: {
    padding: 4,
    marginRight: 'auto',
    width: '80%',
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
    marginLeft: 'auto',
    borderTopLeftRadius: 10,
    backgroundColor: '#c6dec6',
    margin: 5,
    marginBottom: 9,
  },
  friendsDeleteMessageContainer: {
    marginRight: 'auto',
    borderTopRightRadius: 10,
    backgroundColor: '#c6dec6',
    margin: 5,
    marginBottom: 9,
  },
});

export default Chat;
