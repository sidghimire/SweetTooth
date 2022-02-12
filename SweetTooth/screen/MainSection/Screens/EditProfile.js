import React, {useEffect, useState} from 'react';
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
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import Avatar from '../../../resources/images/avatar/1.png';
import Background from '../../../resources/images/assetImages/BackgroundImage.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function EditProfile() {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

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
          <View style={{marginTop:'auto',marginBottom:'auto'}}>
            <TouchableOpacity
              style={[styles.uploadButton]}
              onPress={() => setModalVisible(false)}>
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
