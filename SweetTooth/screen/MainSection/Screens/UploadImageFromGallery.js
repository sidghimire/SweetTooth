import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
function UploadImageFromGallery({route}) {
    const ImageUri = route.params.uri;

    return (
    <View style={styles.container}>
        <Image source={{uri:ImageUri}} style={{flex:1}}/>
    </View>
    );
}

export default  UploadImageFromGallery;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
