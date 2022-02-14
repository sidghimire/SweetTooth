import React, {useEffect, useState,useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {signOut, getAuth} from 'firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../../resources/images/avatar/1.png';
import {
  collection,
  getFirestore,
  where,
  getDocs,
  query,
  addDoc,
  doc,
  onSnap,
  orderBy,
} from 'firebase/firestore';
const Stack = createStackNavigator();

function ChatList({navigation}) {
  const auth = getAuth();
  const db = getFirestore();
  const senderUid = auth.currentUser.uid;
  const receiverUid = 'pgaIavR0uCfPeRtEQjDh9XHXdj83';
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState(null);
  const [chatData, setChat] = useState(null);

  const checkChatLog = async (senderUid, receiverUid) => {
    if (chatId == null) {
      const collectionDB = collection(db, 'chatLog');
      const q = query(
        collectionDB,
        where('user', 'array-contains-any', [receiverUid, senderUid]),
      );
      await getDocs(q).then(async docs => {
        if (docs.size > 0) {
          docs.forEach(chatDoc => {
            setChatId(chatDoc.id);
          });
        } else {
          await addDoc(collection(db, 'chatLog'), {
            user: [senderUid, receiverUid],
          }).then(doc => {
            setChatId(doc.id);
          });
        }
      });
    }
  };
  useEffect(() => {
    checkChatLog(senderUid, receiverUid);
  }, [checkChatLog]);
  useLayoutEffect(() => {
    const collectionDB = collection(db, 'chat');
    const q = query(collectionDB);
    const unsubscribe=onSnapshot(q, (snapshot) => {
        console.log(snapshot);
    })
    return () => unsubscribe();
  }, []);
  const sendMessage = async (senderUid, receiverUid, message) => {
    setMessage('');
    const collectionDB = collection(db, 'chat', chatId, 'messages');
    await addDoc(collectionDB, {
      message: message,
      sender: senderUid,
      timeStamp: Date.now(),
    });
  };

  const chatRender = ({item}) => {
    console.log(item);
    return <Text style={{color: '#000'}}>{item.message}</Text>;
  };
  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <View>
          <Icon
            name="arrow-left"
            size={25}
            color="#000"
            style={{marginTop: 'auto', marginBottom: 'auto'}}
          />
        </View>
        <View style={styles.avatarView}>
          <Image source={Avatar} style={styles.avatar} />
        </View>
        <View>
          <Text style={styles.receiverName}>Bibs</Text>
        </View>
      </View>
      <View style={styles.chatView}>
        {chatData != null ? (
          <FlatList data={chatData} renderItem={chatRender} />
        ) : null}
      </View>

      <View style={styles.customBottom}>
        <TextInput
          placeholder="Type a message"
          style={styles.textInput}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <Icon
          onPress={() => sendMessage(senderUid, receiverUid, message)}
          name="send-circle"
          size={45}
          color="#4064AC"
          style={{marginTop: 'auto', marginBottom: 'auto'}}
        />
      </View>
    </View>
  );
}

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customHeader: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    width: '100%',
  },
  customBottom: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    flexDirection: 'row',
    width: '100%',
  },
  receiverName: {
    fontSize: 16,
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  avatarView: {
    paddding: 2,
    borderColor: '#218721',
    borderRadius: 30,
    borderWidth: 2,
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    padding: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#989898',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  chatView: {
    flex: 1,
  },
});
