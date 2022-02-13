import React, {useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';

import ImagePicker from 'react-native-image-crop-picker';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {
  getDocs,
  collection,
  doc,
  query,
  where,
  getFirestore,
  updateDoc,
  addDoc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import Avatar from '../../../resources/images/avatar/1.png';
import Background from '../../../resources/images/assetImages/BackgroundImage.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoader from '../../../resources/animation/AppLoader';
import ImageResizer from 'react-native-image-resizer';

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function EditProfile({navigation}) {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const [isLoading, setIsLoading] = useState(false);

  const getImageFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async picture => {
      setIsLoading(true);
      const bigImageId = generateString(16);
      const smallImageId = generateString(16);
      ImageResizer.createResizedImage(picture.path, 150, 150, 'JPEG', 100).then(
        async response => {
          let imageUrl = 'userImage/' + bigImageId + '.jpg';
          const photoRef = ref(storage, imageUrl);
          const img = await fetch(response.uri);
          const bytes = await img.blob();

          await uploadBytes(photoRef, bytes).then(() => {});
        },
      );
      ImageResizer.createResizedImage(picture.path, 50, 50, 'JPEG', 80).then(
        async response => {
          let imageUrl = 'userImage/' + smallImageId + '.jpg';
          const photoRef = ref(storage, imageUrl);
          const img = await fetch(response.uri);
          const bytes = await img.blob();

          await uploadBytes(photoRef, bytes).then(async () => {
            var col = [];
            const reference = ref(
              storage,
              'userImage/' + smallImageId + '.jpg',
            );
            await getDownloadURL(reference).then(url => {
              col.push(url);
            });
            const reference2 = ref(storage, 'userImage/' + bigImageId + '.jpg');
            await getDownloadURL(reference2).then(url => {
              col.push(url);
            });

            const post = {
              bigImageId: col[1],
              smallImageId: col[0],
            };

            const collectionDB = collection(db, 'users');
            const user = auth.currentUser.uid;
            const q = query(collectionDB, where('uid', '==', user));
            await getDocs(q).then(result => {
              result.forEach(docu => {
                const uniqID = docu.id;
                updateDoc(doc(db,'users',uniqID), post).then(() => {
                  setIsLoading(false);
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'Profile'}],
                    }),
                  );
                });
              });
            });
          });
        },
      );
    });
  };

  const getImageFromGallery34 = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      ImageResizer.createResizedImage(image.path, 150, 150, 'JPEG', 100).then(
        async resizedImage => {
          setIsLoading(true);
          const imageUri = resizedImage.uri;
          const collectionDB = collection(db, 'users');
          const user = auth.currentUser.uid;
          const q = query(collectionDB, where('uid', '==', user));
          const userDoc = await getDocs(q).then(async result => {
            result.forEach(async docu => {
              const userData = docu.data();
              const userId = docu.id;
              const bigImageId = generateString(16);
              let imageUrl = 'userImage/' + bigImageId + '.jpg';
              const photoRef = ref(storage, imageUrl);
              const img = await fetch(imageUri);
              const bytes = await img.blob();
              const docRef = doc(db, 'users', userId);
              await uploadBytes(photoRef, bytes).then(async () => {
                await getDownloadURL(photoRef).then(async url => {
                  await updateDoc(docRef, {image: url}).then(async () => {
                    setIsLoading(false);
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{name: 'Profile'}],
                      }),
                    );
                  });
                });
              });
            });
          });
        },
      );
    });

    //navigation.navigate("UploadImageFromGallery",{uri:response.assets[0].uri})
  };

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getProfileImage();
  }, []);

  const getProfileImage = async () => {
    const collectionDB = collection(db, 'users');
    const q = query(collectionDB, where('uid', '==', auth.currentUser.uid));
    await getDocs(q).then(result => {
      result.forEach(doc => {
        const data = doc.data();
        if ('profileImage' in data) {
          setProfileImage(data.profileImage);
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      {profileImage == null ? (
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image source={Avatar} style={styles.avatarImage} />
          <View
            style={{
              padding: 5,
              backgroundColor: '#000',
              borderColor: '#fff',
              borderWidth: 2,
              borderRadius: 30,
              width: 30,
              alignSelf: 'center',
              position: 'relative',
              top: -25,
              left: 30,
            }}>
            <Icon name="pencil" color="#fff" size={16} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Image source={{uri: profileImage}} style={styles.avatarImage} />
        </TouchableOpacity>
      )}
      <View style={{flexDirection: 'column', marginBottom: 20}}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter Full Name"
          placeholderTextColor={'#a9a9a9'}
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.inputField}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={'top'}
          placeholder="Enter Full Name"
          placeholderTextColor={'#a9a9a9'}
          value={bio}
          onChangeText={text => setBio(text)}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{marginLeft: 'auto', marginTop: 20, marginRight: 20}}
            onPress={() => setModalVisible(false)}>
            <Icon name="close" size={35} color="#fff" />
          </TouchableOpacity>
          <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <TouchableOpacity
              style={[styles.uploadButton]}
              onPress={() => getImageFromGallery()}>
              <Text style={styles.uploadButtonText}>
                Upload Image From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.uploadButtonText}>
                Capture Picture Using Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <Modal visible={isLoading}>
            <View style={styles.modalContainer}>
              <AppLoader />
            </View>
          </Modal>
        ) : null}
      </Modal>
    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputField: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#909090',
    width: '90%',
    alignSelf: 'center',
    marginTop: -10,
  },
  avatarImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderColor: '#218721',
    borderWidth: 4,
    alignSelf: 'center',
  },
  label: {
    fontSize: 13,
    color: '#989898',
    marginLeft: '7%',
  },
  modalContainer: {
    width: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  uploadButton: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  uploadButtonText: {
    color: '#20232A',
    textAlign: 'center',
    fontSize: 16,
  },
});
