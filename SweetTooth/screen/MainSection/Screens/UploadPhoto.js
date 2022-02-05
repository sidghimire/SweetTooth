import React,{useState} from 'react';
import { View, Text,Dimensions, TouchableOpacity, StyleSheet, StatusBar,Image, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function CameraNavigator({navigation,route}) {
    const imageId=route.params;
    const [bio,setBio]=useState('');
return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Image source={{uri:imageId.image}} resizeMode='contain' style={{width:'95%',height:'50%',marginTop:-20,alignSelf:'center',margin:30}}/>
        <TextInput style={styles.inputField} placeholder='Enter A Bio' numberOfLines={5} placeholderTextColor={"#a9a9a9"} value={bio} onChangeText={text=>setBio(text)} />
        <TouchableOpacity opacity={0.8} style={[styles.postIcon]} onPress={()=>navigation.navigate('UploadPhoto',{image:picture})}>
            <Text style={{fontSize:18,color:'#fff',marginRight:5,textAlign:'center',justifyContent:'center'}}>Publish </Text>
            <Icon name='arrow-right' size={24} color={'#fff'} />        
        </TouchableOpacity>
    </View>
)
}

export default  CameraNavigator;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
inputField: {
    padding:10,
    borderWidth:1,
    borderColor:'#b9b9b9',
    borderRadius:10,
    width:'80%',
    alignSelf:'center',
    marginVertical:10,
    textAlign:'left',
    textAlignVertical:'top',
},
postIcon:{
    position:'absolute',
    bottom:30,
    right:30,
    backgroundColor:"#1C9CEA",
    borderRadius:50,
    padding:7,
    borderWidth:1,
    borderColor:"#fff",
    alignSelf:'center',
    flexDirection:'row',
    paddingHorizontal:30,
    paddingVertical:15
}
});
