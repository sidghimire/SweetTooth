import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  Image,
  Modal,
  RefreshControl,
} from 'react-native';
import {getAuth} from 'firebase/auth';
import {
  getDocs,
  doc,
  collection,
  getFirestore,
  query,
  where,
  getDoc,
} from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoader from '../../../resources/animation/AppLoader';

import avatar from '../../../resources/images/avatar/1.png';

function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();
  const [storyData, setStoryData] = useState(null);
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    getStoryData();
    getPostData();
  }, []);
  /*
const getStoryData = async () => {
    const docDB = collection(db, 'stories');
    const q = query(docDB);
    await getDocs(q).then(result => {
      let col = [];
      result.forEach(doc => {
        col.push([doc.id, doc.data()]);
      });
      setStoryData(col);
    });
  };
  */

  const getStoryData = async () => {
    const docDB = collection(db, 'stories');
    const q = query(docDB);
    var allData = [];
    await getDocs(q).then(posts => {
      posts.forEach(async post => {
        allData.push([post.id, post.data()]);
      });
    });
    const col = [];
    const docLength = allData.length;
    var i = 0;
    allData.forEach(async post => {
      const userId = post[1].userId;
      const docDB = collection(db, 'users');
      const q2 = query(docDB, where('uid', '==', userId));
      await getDocs(q2).then(result => {
        result.forEach(doc => {
          col.push([post[0], post[1], doc.data()]);
        });
      });
      i++;
      if (i == docLength) {
        setIsLoading(false);
        setStoryData(col);
      }
    });

    setIsLoading(false);
  };

  const getPostData = async () => {
    const docDB = collection(db, 'posts');
    const q = query(docDB);
    var allData = [];
    await getDocs(q).then(posts => {
      posts.forEach(async post => {
        allData.push([post.id, post.data()]);
      });
    });
    const col = [];
    const docLength = allData.length;
    var i = 0;
    allData.forEach(async post => {
      const userId = post[1].uid;
      const docDB = collection(db, 'users');
      const q2 = query(docDB, where('uid', '==', userId));
      await getDocs(q2).then(result => {
        result.forEach(doc => {
          col.push([post[0], post[1], doc.data()]);
        });
      });
      i++;
      if (i == docLength) {
        setIsLoading(false);
        setPostData(col);
      }
    });

    setIsLoading(false);
  };

  const storyItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            padding:2,
            marginHorizontal: 5,
            borderRadius: 100,
            borderColor: '#218721',
            borderWidth: 3,
          }}>
          <Image
            source={{uri: item[1].smallImageId}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              alignSelf: 'center',
            }}
          />
        </View>
        <Text style={{textAlign:'center',color:'#000',fontWeight:'bold',fontSize:12,justifyContent:'center',marginTop:5}}>{item[2].username}</Text>
      </View>
    );
  };

  const postItem = ({item}) => {
    const date = new Date(item[1].date);
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            padding: 7,
            paddingVertical:12,
            borderTopColor: '#e9e9e9',
            borderTopWidth: 1,
          }}>
          <Image
            source={{uri: item[2].smallImageId}}
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              borderColor: '#218721',
              borderWidth: 1,
              marginHorizontal: 10,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontWeight: '500',
              justifyContent: 'center',
              textAlignVertical: 'center',
            }}>
            {item[1].username.toLowerCase()}
          </Text>
          <Icon
            name="dots-vertical"
            size={24}
            color={'#000'}
            style={{marginLeft: 'auto', textAlignVertical: 'center'}}
          />
        </View>
        <Image
          source={{uri: item[1].imageId}}
          style={{height: 400, flex: 1, width: null}}
        />
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            paddingVertical: 15,
            borderTopColor: '#c9c9c9',
            borderTopWidth: 1,
            paddingBottom:30
          }}>
          <View style={{flex: 2, flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontWeight: '400',
                letterSpacing: 1,
                justifyContent: 'center',
                textAlign: 'justify',
                textAlignVertical: 'center',
              }}>
              {item[1].bio}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#585858',
                fontWeight: '400',
                justifyContent: 'center',
                textAlign: 'justify',
                textAlignVertical: 'center',
                marginTop: 10,
              }}>
              {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 'auto',
              marginLeft: 10,
            }}>
            <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
              <Icon
                name="heart-outline"
                size={27}
                color={'#000'}
                style={{marginHorizontal: 3}}
              />
              <Icon
                name="comment-outline"
                size={27}
                color={'#000'}
                style={{marginHorizontal: 3}}
              />
              <Icon
                name="share-outline"
                size={27}
                color={'#000'}
                style={{marginHorizontal: 3}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  /*
            
*/

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />
      <View>
        {storyData == null ? null : (
          <FlatList
            data={storyData}
            renderItem={storyItem}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item[0]}
            horizontal={true}
            style={{paddingVertical: 15}}
            nestedScrollEnabled
          />
        )}
      </View>
      <View>
        {postData == null ? (
          <Modal visible={true}>
            <View style={styles.modalContainer}>
              <AppLoader />
            </View>
          </Modal>
        ) : (
          <FlatList
            data={postData}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getPostData} />
            }
            renderItem={postItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item[0]}
            horizontal={false}
            nestedScrollEnabled
          />
        )}
      </View>
      {isLoading ? (
        <Modal visible={isLoading}>
          <View style={styles.modalContainer}>
            <AppLoader />
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    width: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
});
